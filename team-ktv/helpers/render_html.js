/**
 * Renders the root HTML document that boots the Inertia + Vue app.
 *
 * In development it loads assets from the Vite dev server (with HMR).
 * In production it reads the Vite build manifest to resolve hashed asset URLs.
 */

const fs = require('fs');
const path = require('path');

const isDev = process.env.development_mode === 'true';
const FRONTEND_DIR = path.resolve(__dirname, '..', '..', 'team-ktv-frontend');
const VITE_DEV_URL = process.env.vite_dev_url || 'http://localhost:5173';
const ENTRY = 'src/main.js';

let cachedManifest = null;
function loadManifest()
{
    if (cachedManifest) return cachedManifest;
    const manifestPath = path.join(FRONTEND_DIR, 'dist', '.vite', 'manifest.json');
    try
    {
        cachedManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    }
    catch (e)
    {
        cachedManifest = {};
    }
    return cachedManifest;
}

function devTags()
{
    return `
    <script type="module" src="${VITE_DEV_URL}/@vite/client"></script>
    <script type="module" src="${VITE_DEV_URL}/${ENTRY}"></script>`;
}

function prodTags()
{
    const manifest = loadManifest();
    const entry = manifest[ENTRY];
    if (!entry) return '';

    let tags = '';
    // CSS emitted for the entry.
    for (const css of entry.css || [])
    {
        tags += `\n    <link rel="stylesheet" href="/${css}">`;
    }
    tags += `\n    <script type="module" src="/${entry.file}"></script>`;
    return tags;
}

function escapeAttr(json)
{
    return json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderHtml(page /*, req */)
{
    const dataPage = escapeAttr(JSON.stringify(page));
    const assetTags = isDev ? devTags() : prodTags();

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team KTV</title>${assetTags}
  </head>
  <body>
    <div id="app" data-page="${dataPage}"></div>
  </body>
</html>`;
}

module.exports = { renderHtml };
