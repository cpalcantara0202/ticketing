const { all }           = require('axios');
const Users             = require('../../models/db_Innova_users');
const TICKET_MODEL      = require('../../models/db_ticket');

module.exports = class TemplateController {
  
  async countUnitTask (req, res){       //get_unitheaddash
    
    let Unitdashboard = {};
        
    let Dept_name                       = req.logged_in_user.department;
    let ticket_model                    = new TICKET_MODEL();
    let unitOngoing                     = await ticket_model.find({status:"Assigned", submitted_to:Dept_name})
    Unitdashboard.Ongoing               = unitOngoing.length;

    let unitAssigning                   = await ticket_model.find({status:"Open", submitted_to:Dept_name})
    Unitdashboard.Assigning             = unitAssigning.length;

    let unitReturned                    = await ticket_model.find({status:"Returned", submitted_to:Dept_name})
    Unitdashboard.Returned              = unitReturned.length;

    let unitmisRouted                   = await ticket_model.find({status:"Misrouted", submitted_to:Dept_name})
    Unitdashboard.Misrouted             = unitmisRouted.length;
    
    let unitDone                        = await ticket_model.find({status:"Resolved", submitted_to:Dept_name})
    Unitdashboard.Done                  = unitDone.length;

    //--------Total created/solved/average tickets per department------------//
    let totalCreated                    = await ticket_model.find({status:"Open", submitted_to:Dept_name})
    Unitdashboard.Totalcreated          = totalCreated.length;

    let totalSolved                     = await ticket_model.find({status:"Resolved", submitted_to:Dept_name})
    Unitdashboard.TotalSolved           = totalSolved.length;

    let averageCreated                  = totalCreated.length/totalSolved.length;
    Unitdashboard.Averagecreatedticket  = averageCreated

    return global.controller.handleSuccess(req, res, { response_data: Unitdashboard});
    }
  }
         