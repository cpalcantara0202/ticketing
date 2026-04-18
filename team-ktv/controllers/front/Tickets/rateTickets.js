const TICKET_MODEL = require('../../../models/db_ticket');

module.exports = class TemplateController
{
    async rate_tickets (req, res)
    {  
        let ticket_model            = new TICKET_MODEL();
        let ticketStatus            = ['Resolved']
        let ticketResolved          = ticketStatus[0];
        let ticketid                = req.body.ticketid;
        req.body.status             = ticketResolved;
        await ticket_model.collection.findOneAndUpdate({ ticketid},req.body); 
        return global.controller.handleSuccess(req, res, { response_data: "Ticket Rated"});
    }
}