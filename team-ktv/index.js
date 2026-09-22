const express               = require('express');
const app                   = express();
const cors                  = require('cors');
const http                  = require('http');
const server                = http.createServer(app);
const routes                = require('./routes/api_routes');
const inertia_routes        = require('./routes/inertia_routes');
const session               = require('express-session');
const { inertiaMiddleware } = require('./helpers/inertia');
const { renderHtml }        = require('./helpers/render_html');
const { attachUser }        = require('./classes/AuthMiddleware');
const io                    = require("socket.io")(server, { cors: { origin: "*", methods: ["GET", "POST"] }});
const file_upload           = require('express-fileupload');
const path                  = require('path')
global.base_path            = __dirname;

require('dotenv').config();

let port = process.env.backend_port;

// global handlers and helpers  
require('./helpers/log_handler');
require('./helpers/utility_handler');

let bodyParser = require('body-parser');

app.use(file_upload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

// Sessions (replaces the header-id auth scheme for Inertia).
app.use(session({
    secret: process.env.session_secret || 'team-ktv-dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.development_mode !== 'true',
        maxAge: 1000 * 60 * 60 * 8, // 8 hours
    },
}));
app.use(attachUser);

// Inertia adapter: renders the HTML shell / JSON page objects.
app.use(inertiaMiddleware({
    version: process.env.asset_version || '1',
    renderHtml,
    sharedProps: (req) => ({
        auth: { user: (req.session && req.session.user) || null },
    }),
}));

// JSON API kept intact under /api during migration.
app.use('/api', routes);
app.use('/images', express.static(__dirname + '/images'));

// Inertia page routes at the root.
app.use('/', inertia_routes);

let serve = server.listen({port: port}, (err) =>
{
    if(err)
    {
        process.exit(1);
    }
    else
    {
        console.log(`Server Ready on Port ${port}:`);
    }
});

module.exports = serve;




