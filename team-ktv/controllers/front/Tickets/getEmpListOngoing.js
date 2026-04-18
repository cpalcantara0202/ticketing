const { all }           = require('axios');
const Users             = require('../../../models/db_Innova_users');
const TICKET_MODEL      = require('../../../models/db_ticket');

module.exports = class TemplateController {

     async getEmpListOngoing (req, res)       //get_emp_list_ongoing
     {
        
         let output = {};
 
         let empDashcount                    = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
         let ticket_model                    = new TICKET_MODEL();
         let Inprogress                      = await ticket_model.find({requestor:empDashcount,status:'Assigned'})
         output.inprogress                   = Inprogress.length

        let empcount                         = req.logged_in_user.department
        let users                            = new Users()
        let allemplist                       = await users.find({department:empcount})
        output.employee_list                 = allemplist

        return global.controller.handleSuccess(req, res, { response_data: output });
     }
    }