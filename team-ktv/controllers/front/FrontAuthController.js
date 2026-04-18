const { response } = require("express");

module.exports = class TemplateController
{
    async index(req, res)
    {
        return global.controller.handleSuccess(req, res, { response_data: 'Start' });
    }
}