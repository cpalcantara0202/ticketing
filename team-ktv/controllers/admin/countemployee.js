const { all }           = require('axios');
const Users             = require('../../models/db_Innova_users');
const TICKET_MODEL      = require('../../models/db_ticket');
const { MongoClient }   = require('mongodb');
const uri               = 'mongodb+srv://cpalcantara02:Thesis2023@cluster0.lqi7lcv.mongodb.net/db_Innova'; 
const client            = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = class TemplateController {

     async countEmpDashboard (req, res)       //get_counter
     {
         let output = {};
 
         let empDashcount                    = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
         let ticket_model                    = new TICKET_MODEL();
         let empCounter                      = await ticket_model.find({assignee:empDashcount,status:'Assigned'})
         output.my_task                      = empCounter.length;
 
         let submitted                       = await ticket_model.find({requestor:empDashcount,status:'Open'})
         output.submitted_task               = submitted.length;
 
         let Inprogress                      = await ticket_model.find({assignee:empDashcount,status:'Assigned'})
         output.inprogress                   = Inprogress.length

        let forreview                        = await ticket_model.find({requestor:empDashcount,status:'Closed'})
        output.forReview                     = forreview.length
         
        let EmployeeDone                     = await ticket_model.find({assignee:empDashcount,status:'Resolved'})
        output.Empdone                       = EmployeeDone.length

        let empPending                       = await ticket_model.find({assignee:empDashcount,status:'Assigned'})
        output.pending                       = empPending.length

        let empClosed                        = await ticket_model.find({assignee:empDashcount,status:'Closed'})
        output.closed                        = empClosed.length

        let emplResolved                     = await ticket_model.find({assignee:empDashcount,status:'Resolved'})
        output.resolved                      = emplResolved.length

        let empcount                         = req.logged_in_user.department
        let users                            = new Users()
        let allemplist                       = await users.find({department:empcount})
        output.employee_count                = allemplist.length

        return global.controller.handleSuccess(req, res, { response_data: output });
     }

        //----------------Data needed for the reports---------------------------//

    async TotalTicketsAssigned (req, res)     //total_assigned
    {
        let empCountMyTask                  = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                    = new TICKET_MODEL();
        let EmployeeTask                    = await ticket_model.find({assignee:empCountMyTask,status_assigned:'Assigned',})
        let countAssign                     = EmployeeTask.length++
        return global.controller.handleSuccess(req, res, { response_data: countAssign});
    }
    async TotalTicketsClosed (req, res)     ///total_closed
    {
        let empCountMyTask                  = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                    = new TICKET_MODEL();
        let EmployeeTask                    = await ticket_model.find({assignee:empCountMyTask,status_closed:'Closed'})
        let countClosed                     = EmployeeTask.length++
        req.body.total_tickets_closed       = countClosed
        return global.controller.handleSuccess(req, res, { response_data: countClosed });
    }
          async allReports (req, res)
        {
        let ticket_model                           = new TICKET_MODEL();
        let Employee_assignee                      = await ticket_model.find({})
        let totAssign                              = Employee_assignee.countAssign
        console.log(totAssign)
        let totClosed                              = Employee_assignee.countClosed
        console.log(totClosed)
        let totRating                              = Employee_assignee.result   
        console.log(totRating)                        
        return global.controller.handleSuccess(req, res, { response_data:""});
      }
   }
    