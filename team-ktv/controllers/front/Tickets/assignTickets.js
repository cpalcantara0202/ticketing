const TICKET_MODEL   = require('../../../models/db_ticket');
const moment         = require('moment');  

module.exports = class TemplateController
{
    async assignTicket (req, res)
    {
            let ticket_model                    = new TICKET_MODEL();
            let Assigned_Date                   = moment().format('LLL');
            let UnitAssignor                    = req.logged_in_user.firstname+" "+req.logged_in_user.lastname;
            let formatted_assigned_date         = Assigned_Date
            let ticketStatus                    = ['Assigned']
            let ticketAssigned                  = ticketStatus[0];
            let ticketid                        = req.body.ticketid;
            req.body.assigned_date              = formatted_assigned_date
            req.body.status                     = ticketAssigned;
            req.body.assignee                   = req.body.assignee;
            //req.body.description                = req.body.description;
            req.body.assignor                   = UnitAssignor;    
            await ticket_model.collection.findOneAndUpdate({ ticketid }, req.body);//assignedto>concerned department
            return global.controller.handleSuccess(req, res, { response_data: "Ticket was assigned successfully"});
            }
        }