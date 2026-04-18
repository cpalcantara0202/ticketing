const Users = require('../../models/db_Innova_users');
const TICKET_MODEL = require('../../models/db_ticket');

module.exports = class Status_Controller {
    
        async view_Dept_List(req, res)
         {
        let db_ticket = new TICKET_MODEL();
        let empName =  req.body.empName
        let getEmployee     = await db_ticket.find({assignee:empName,status:'Resolved'})

        return global.controller.handleSuccess(req, res, { response_data: getEmployee })

        }

    }
