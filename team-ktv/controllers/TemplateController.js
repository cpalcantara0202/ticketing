module.exports = class TemplateController
{
    async methodName(req, res)
    {
        return global.controller.handleSuccess(req, res, { response_data: null });
    }
}