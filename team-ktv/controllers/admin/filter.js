const TICKET_MODEL     = require('../../models/db_Department');

module.exports = class TemplateController
{
async filterByDate (req, res)
{
let ticket_model           = new TICKET_MODEL();
const {startDate,endDate}  = req.body;
const filter_user           = req.logged_in_user.department

ticket_model               = await ticket_model.find({department:filter_user,
    completed_date:
     {$gte:new Date(startDate)}},
     {$lte:new Date(startDate)});


     return global.controller.handleSuccess(req, res, { response_data: ticket_model });
 }
 
}