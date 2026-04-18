const TICKET_MODEL = require('../../../models/db_ticket');
const moment         = require('moment');  

module.exports = class TemplateController
{
    async markPending (req, res)
    {
            let Assigned_Date               = moment().format('LLL');
            let assignee                = req.logged_in_user.firstname+" "+req.logged_in_user.lastname;
            let formatted_assigned_date     = Assigned_Date
            let ticketStatus                = ['Pending']
            let ticketPending               = ticketStatus[0];
            let ticketid                    = req.body.ticketid;
            let ticket_model                = new TICKET_MODEL();
            req.body.assigned_date          = formatted_assigned_date
            req.body.status                 = ticketPending;
            req.body.assignee               = assignee
            await ticket_model.collection.findOneAndUpdate({ ticketid }, req.body);//assignedto>concerned department
            return global.controller.handleSuccess(req, res, { response_data: "Ticker mark as Roadblock"});
    }
}