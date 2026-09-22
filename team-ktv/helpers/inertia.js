/**
 * Minimal Inertia.js server-side adapter for Express.
 *
 * Implements the Inertia protocol (https://inertiajs.com/the-protocol):
 *  - First visit: returns full HTML with a data-page attribute containing the
 *    JSON page object.
 *  - Inertia visit (X-Inertia header): returns the page object as JSON with
 *    the X-Inertia response header.
 *  - Version mismatch on GET: returns 409 with X-Inertia-Location so the
 *    client performs a full reload.
 *
 * Usage:
 *   const { inertiaMiddleware } = require('./helpers/inertia');
 *   app.use(inertiaMiddleware({ version, renderHtml }));
 *   // then in a route:
 *   res.inertia('TaskList', { tickets });
 */

const INERTIA_HEADER = 'x-inertia';

function inertiaMiddleware(options = {})
{
    const {
        version = '1',
        // renderHtml(pageObject, req) -> full HTML document string
        renderHtml,
        // sharedProps(req) -> object merged into every response's props
        sharedProps = () => ({}),
    } = options;

    if (typeof renderHtml !== 'function')
    {
        throw new Error('inertiaMiddleware requires a renderHtml(pageObject, req) function');
    }

    return function (req, res, next)
    {
        const resolvedVersion = typeof version === 'function' ? version() : version;

        // Attach the render helper to the response.
        res.inertia = function (component, props = {})
        {
            const shared = sharedProps(req) || {};
            const mergedProps = Object.assign({}, shared, props);

            // Partial reloads: client asks for only some props via headers.
            const only = (req.headers['x-inertia-partial-data'] || '')
                .split(',')
                .map(s => s.trim())
                .filter(Boolean);
            const partialComponent = req.headers['x-inertia-partial-component'];

            let finalProps = mergedProps;
            if (only.length > 0 && partialComponent === component)
            {
                finalProps = {};
                for (const key of only)
                {
                    if (key in mergedProps) finalProps[key] = mergedProps[key];
                }
            }

            const page = {
                component,
                props: finalProps,
                url: req.originalUrl,
                version: resolvedVersion,
            };

            const isInertia = req.headers[INERTIA_HEADER] === 'true';

            if (isInertia)
            {
                res.setHeader('Vary', 'X-Inertia');
                res.setHeader('X-Inertia', 'true');
                res.setHeader('Content-Type', 'application/json');
                return res.status(200).send(JSON.stringify(page));
            }

            const html = renderHtml(page, req);
            res.setHeader('Content-Type', 'text/html');
            return res.status(200).send(html);
        };

        // Redirect helper that respects Inertia's 303 requirement for
        // PUT/PATCH/DELETE and external location handling.
        res.inertiaLocation = function (url)
        {
            if (req.headers[INERTIA_HEADER] === 'true')
            {
                res.setHeader('X-Inertia-Location', url);
                return res.status(409).end();
            }
            return res.redirect(url);
        };

        // Version check: on Inertia GET requests with a stale asset version,
        // force a full page reload.
        const isInertia = req.headers[INERTIA_HEADER] === 'true';
        const clientVersion = req.headers['x-inertia-version'];
        if (isInertia && req.method === 'GET' && clientVersion !== undefined && clientVersion !== String(resolvedVersion))
        {
            res.setHeader('X-Inertia-Location', req.originalUrl);
            return res.status(409).end();
        }

        next();
    };
}

module.exports = { inertiaMiddleware };
