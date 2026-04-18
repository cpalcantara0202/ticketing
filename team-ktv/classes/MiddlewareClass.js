const TokenClass            = require('../classes/TokenClass');
const Controller            = require('../controllers/Controller');
const DB_USER               = require('../models/db_user');
const token_class           = new TokenClass();
const controller            = new Controller();
const { validationResult }  = require('express-validator');

module.exports =
{
    async constructor(req)
    {
        logger(`${clc.yellow('INITIALIZED')} ${req.url}`);
    },
    async authenticate(req)
    {
        if(global_config.development_mode == "true")
        {
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
            await delay(1000) /// waiting 2 second.
        }

        let auth_header     = req.headers.authorization;
        let auth_response   = { status: "error", data: null };

        //check if bearer header is available
        if(!auth_header)
        {
            auth_response.data = "Invalid Authentication";
        }
        else if (!auth_header.startsWith("Bearer "))
        {
            auth_response.data = "Invalid Authentication";
        }
        else
        {
            let token           = auth_header.substring(7, auth_header.length);
            let verify_token    = await token_class.compare(token);

            //check if token verification has error
            if(verify_token.status == "error")
            {
                auth_response.data = verify_token.data;
            }
            else
            {
                let db_user                 = new DB_USER();
                let authorized_user_info    = await db_user.findById(verify_token.data.data._id);
              
                auth_response.status        = "success";
                auth_response.data          = authorized_user_info;
            }
        }

        return auth_response;
    },
    async adminOnly(req, res, next)
    {
        await module.exports.constructor(req);

        let auth_response = await module.exports.authenticate(req);

        if(auth_response.status == "error")
        {
            controller.handleError(req, res, auth_response.data);
        }
        else if(auth_response.data.user_type != "admin")
        {
            controller.handleError(req, res, `Invalid User Type (${auth_response.data.user_type})`);
        }
        else
        {
            req.auth_user_info = auth_response.data;
            next();
        }
    },
    async userOnly(req, res, next)
    {
        await module.exports.constructor(req);

        let auth_response = await module.exports.authenticate(req);
       
        if(auth_response.status == "error")
        {
            controller.handleError(req, res, auth_response.data);
        }
        else if(!auth_response.data)
        {
            controller.handleError(req, res, `Invalid Token`);
        }
        else if(auth_response.data.user_type != "customer")
        {
            controller.handleError(req, res, `Invalid User Type (${auth_response.data.user_type})`);
        }
        else
        {
            req.auth_user_info = auth_response.data;
            next();
        }
    },
    async noUserOnly(req, res, next)
    {
        await module.exports.constructor(req);
        next();
    },
    async validation(req, res, next)
    {
        const errors = validationResult(req);

        if (!errors.isEmpty())
        {
            return controller.handleValidationError(req, res, errors);
        }
        else
        {
            next();
        }
    },
}