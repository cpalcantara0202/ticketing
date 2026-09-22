/**
 * Session-based authentication middleware for Inertia page & action routes.
 *
 * Replaces the previous header-id scheme (SimpleMiddlewareClass.memberOnly).
 * The logged-in user is stored in req.session.user at login time.
 *
 *  - authenticated: guards routes; redirects browser/Inertia visits to /login.
 *  - adminOnly:     further restricts to user_role === 1 (admin).
 *  - attachUser:    exposes the session user on req.logged_in_user for
 *                   controllers that expect it.
 */

function attachUser(req, res, next)
{
    if (req.session && req.session.user)
    {
        req.logged_in_user = req.session.user;
    }
    next();
}

function authenticated(req, res, next)
{
    if (req.session && req.session.user)
    {
        req.logged_in_user = req.session.user;
        return next();
    }
    // Inertia expects a 409 redirect header; res.inertiaLocation handles both
    // Inertia and plain browser requests.
    if (typeof res.inertiaLocation === 'function')
    {
        return res.inertiaLocation('/login');
    }
    return res.redirect('/login');
}

function adminOnly(req, res, next)
{
    const user = req.session && req.session.user;
    if (user && String(user.user_role) === '1')
    {
        req.logged_in_user = user;
        return next();
    }
    if (typeof res.inertiaLocation === 'function')
    {
        return res.inertiaLocation('/');
    }
    return res.redirect('/');
}

module.exports = { attachUser, authenticated, adminOnly };
