const { all }           = require('axios');
const TICKET_MODEL      = require('../../models/db_ticket');

module.exports = class TemplateController {

    async countMyDash (req, res){               ///get_unittask

        let UnitCount= {};
        
        let ticket_model                     = new TICKET_MODEL();
        let logUser                          = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let unitmytask                       = await ticket_model.find({status:"Assigned", assignee:logUser})
        UnitCount.unitmytask                 = unitmytask.length;

        let unitsubmitted                    = await ticket_model.find({status:"Open", requestor:logUser})
        UnitCount.submitted                  = unitsubmitted.length;
     
        let unitinprogress                   = await ticket_model.find({status:"Assigned",requestor:logUser})
        UnitCount.inprogress                 = unitinprogress.length;

        let unitforreview                    = await ticket_model.find({status:"Closed",requestor:logUser})
        UnitCount.forreview                  = unitforreview.length;
    
        let UnitDone                         = await ticket_model.find({status:"Resolved",assignor:logUser})
        UnitCount.done                       = UnitDone.length;
       
           
        return global.controller.handleSuccess(req, res, { response_data: UnitCount });

    }
}