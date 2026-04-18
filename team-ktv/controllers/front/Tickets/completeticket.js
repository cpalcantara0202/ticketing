const TICKET_MODEL   = require('../../../models/db_ticket');
const moment         = require('moment');  

module.exports = class TemplateController
{
    async completeTicket (req, res)
    {             
        let complete_Date               = moment().format('LLL');
        let formatted_complete_date     = complete_Date
        let ticketclosed                = 'Closed'      
        let ticketid                    = req.body.ticketid;
        let ticket_model                = new TICKET_MODEL();
        req.body.completed_date         = formatted_complete_date
        req.body.status                 = ticketclosed;
        req.body.status_closed          = ticketclosed;
        await ticket_model.collection.findOneAndUpdate({ ticketid }, req.body);//closed ticket
        return global.controller.handleSuccess(req, res, { response_data: "Ticket was closed successfully"});
    }
}
