const express               = require('express');
const app                   = express();
const cors                  = require('cors');
const http                  = require('http');
const server                = http.createServer(app);
const routes                = require('./routes/api_routes');
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
app.use('/', routes);
app.use('/images', express.static(__dirname + '/images'));

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




