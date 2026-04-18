const { all }           = require('axios');
const Users             = require('../../models/db_Innova_users');
const TICKET_MODEL      = require('../../models/db_ticket');

module.exports = class TemplateController {
    //admin tasklist///
    async countAdmin (req, res){            //get_admincount
        
        let adminCount= {};
            
        let logAdmin                        = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                    = new TICKET_MODEL();
        let adminSubmitted                  = await ticket_model.find({status:'Open',requestor:logAdmin})
        adminCount.Submitted                = adminSubmitted.length;


        let adminInProg                     = await ticket_model.find({status:'Assigned',requestor:logAdmin})
        adminCount.InProgress               = adminInProg.length;

        let adminforRev                     = await ticket_model.find({status:'Closed',requestor:logAdmin})
        adminCount.ForReview                = adminforRev.length;

        let adminDone                       = await ticket_model.find({status:'Resolved',requestor:logAdmin})
        adminCount.Completed                = adminDone.length;

        let adminSubmit                     = await ticket_model.find({status:'Open',requestor:logAdmin})
        let  Submit                         = adminSubmit.length;
        let adminInProgress                 = await ticket_model.find({status:'Assigned',requestor:logAdmin})
        let  InProgres                      = adminInProgress.length;
        let totalCount                      = Submit+InProgres
        adminCount.Pending                  = totalCount.length

        let  adminclosed                     = await ticket_model.find({status:'Resolved',requestor:logAdmin})
        adminCount.Closed                    = adminclosed.length;

        let adminResolved                   = await ticket_model.find({status:'Resolved',requestor:logAdmin})
        adminCount.Resolved2                = adminResolved.length;

        return global.controller.handleSuccess(req, res, { response_data: adminCount });

    }
}