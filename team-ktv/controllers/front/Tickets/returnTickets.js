const TICKET_MODEL   = require('../../../models/db_ticket');
const moment         = require('moment');  

module.exports = class TemplateController
{
    async returnTicket(req, res)
     {
            let ticketid                        = req.body.ticketid
            let ticket_model                    = new TICKET_MODEL();
            let returned_date                   = moment().format('LLL');
            let Assigned_Date                   = moment().format('LLL');
            let formatted_assign_date           = Assigned_Date;
            let formatted_returned_date         = returned_date;
            req.body.returned_date              = formatted_returned_date;
            req.body.assigned_date              = formatted_assign_date;
            //req.body.assignor                   = req.logged_in_user.firstname + " " + req.logged_in_user.lastname;
            let x = await ticket_model.collection.findOneAndUpdate({ticketid},req.body)
            console.log(x)
            let y =x.requestor_dept
            console.log(y)
            req.body.status                     = 'Returned'
            if(req.body.submitted_to === 'From reject') {

                req.body.submitted_to               = y
                req.body.status                     = 'Misrouted'
           }
           console.log(req.body.submitted_to);
            await ticket_model.collection.findOneAndUpdate({ticketid},req.body)
            return global.controller.handleSuccess(req, res, { response_data: "Ticket was returned successfully 1"})
            
            // let ticketid                        = req.body.ticketid
            // console.log(ticketid)
            // let reqDept                         = ticketid.submitted_to
           
           
            
            req.body.status                     = 'Returned'
            
            return global.controller.handleSuccess(req, res, { response_data: "Ticket was returned successfully 1"})

    }
    async reAssign (req, res)
    {   
        let returned_date             = moment().format('LLL')
        let Assigned_Date             = moment().format('LLL');
        let formatted_assign_date     = Assigned_Date
        let formatted_returned_date   = returned_date
        req.body.returned_date        = formatted_returned_date
        req.body.assigned_date        = formatted_assign_date
        req.body.assignor             = req.logged_in_user.firstname + " " + req.logged_in_user.lastname
        let ticketReAssign            = 'Open'
        let ticketid                  = req.body.ticketid
        req.body.status               = ticketReAssign
        let ticket_model              = new TICKET_MODEL();
        req.body.submitted_to         = req.body.department;
        await ticket_model.collection.findOneAndUpdate({ ticketid }, req.body);
        return global.controller.handleSuccess(req, res, { response_data: "Ticket was returned successfully 2"})
    }
    
}