const { all }           = require('axios');
const Users             = require('../../models/db_Innova_users');
const TICKET_MODEL      = require('../../models/db_ticket');

module.exports = class TemplateController {
    
    //Unit head dashboard counter//                 /count_dashboard
    async countUnitDashboard (req, res)
    {
        let output = {};
 
        let DeptUser                        = req.logged_in_user.department;
        let ticket_model                    = new TICKET_MODEL();
        let unit_head_ongoing               = await ticket_model.find({status:"Assigned", submitted_to:DeptUser})
        let countOngoing                    = unit_head_ongoing.length

        let Unit_head_forassigning           = await ticket_model.find({status:"Open", submitted_to:DeptUser})
        let countForAssigning                = Unit_head_forassigning.length
        output.pending                       = countOngoing + countForAssigning

        let counterclosed                    = await ticket_model.find({status:"Closed", department:DeptUser})
        let countClosed                      = counterclosed.length
        output.closed                        = countClosed  

        let counterresolved                  = await ticket_model.find({status:"Resolved", department:DeptUser})
        let countResolved                    = counterresolved.length
        output.resolved                      = countResolved
        return global.controller.handleSuccess(req, res, { response_data: output});
    }
    
}