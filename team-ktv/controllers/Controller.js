const { validationResult }    = require('express-validator');

module.exports = class Controller
{
    constructor(controller)
    {
        this.controller_name = controller;
    }
    validateResult(req)
    {
        return validationResult(req);
    }
    handleValidationError(req, res, errors)
    {
        if (!errors.isEmpty())
        {
            let errors_array = errors.array();
            return this.handleError(req, res, errors_array[0].msg, 400);
        }
    }
    handleError(req, res, message, code = 400)
    {
        let data            = {};
        data.message        = message;
        data.status_code    = code;
        data.status         = 'error';
        data.time           = new Date();

        logger(`${clc.red('ERROR')} ${req.url}`);
        logger(data);

        return res.status(code).json(data);
    }
    handleSuccess(req, res, data = {})
    {
        data.status             = 'success';
        data.status_code        = 200;
        data.time               = new Date();
        data.development_mode   = global_config.development_mode == "true" ? 1 : 0;

        logger(`${clc.blue('SUCCESS')} ${req.url}`);
        // logger(data);

        return res.send(data);
    }
}