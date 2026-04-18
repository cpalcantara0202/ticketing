const TICKET_MODEL = require('../../../models/db_ticket');
const Subject      = require('../../../models/db_Subject')

module.exports = class TemplateController
{
    //--------------------------UNIT HEAD---------------------------------//

    /*Unit Head --Task List-- (My Task)*/         //unit_head_mytask
    async UnitHeadMyTask(req, res)
    {   
        let Dept_name                        = req.logged_in_user.department;
        let Assignee                         = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let Unit_head_mytask                 = await ticket_model.find({status:"Assigned", assignee:Assignee,submitted_to:Dept_name})
        return global.controller.handleSuccess(req, res, { response_data: Unit_head_mytask });

    }
     /*Unit Head --Task List-- (Submitted)*/          //unit_head_submitted
     async UnitHeadSubmitted(req, res)
     {   
         let Requestor                        = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
         let ticket_model                     = new TICKET_MODEL();
         let Unit_head_submitted              = await ticket_model.find({status:'Open',requestor:Requestor})
         return global.controller.handleSuccess(req, res, { response_data: Unit_head_submitted });
     }
     /*Unit Head --Task List-- (InProgress)*/          //unit_head_inprogress
     async UnitHeadInProgress(req, res)
     {   
         let Requestor                        = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
         let ticket_model                     = new TICKET_MODEL();
         let Unit_head_submitted              = await ticket_model.find({status:'Assigned',requestor:Requestor})
         return global.controller.handleSuccess(req, res, { response_data: Unit_head_submitted });

     }
      /*Unit Head --Task List-- (for review)*/          //unit_head_forreview
      async UnitHeadForReview(req, res)
      {   
          let Requestor                        = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
          let ticket_model                     = new TICKET_MODEL();
          let unit_head_forreview             = await ticket_model.find({status:"Closed", requestor:Requestor})
          return global.controller.handleSuccess(req, res, { response_data: unit_head_forreview });
  
      }
      /*Unit Head -- Department Task-- (Ongoing)*/       //unit_head_ongoing   
      async UnitHeadOngoing(req, res)
      {   
        let Dept_name                        = req.logged_in_user.department;
        let ticket_model                     = new TICKET_MODEL();
        let unit_head_ongoing                = await ticket_model.find({status:"Assigned", submitted_to:Dept_name})
        return global.controller.handleSuccess(req, res, { response_data: unit_head_ongoing });
      }
      /*Unit Head -- Department Task-- (ForAssigning)*/       //unit_head_assigning   
      async UnitHeadForAssigning(req, res)
      {   
        let Dept_name                        = req.logged_in_user.department;
        let ticket_model                     = new TICKET_MODEL();
        let Unit_head_forassigning           = await ticket_model.find({status:"Open", submitted_to:Dept_name})
        return global.controller.handleSuccess(req, res, { response_data: Unit_head_forassigning });
      }
            /*Unit Head -- Department Task-- (Done)*/       //unit_head_done
       async UnitHeadDone(req, res)
      {   
         let Dept_name                        = req.logged_in_user.department;
         let ticket_model                     = new TICKET_MODEL();
         let Unit_head_resolved               = await ticket_model.find({status:"Resolved", submitted_to:Dept_name})
         return global.controller.handleSuccess(req, res, { response_data: Unit_head_resolved });
      }
         /*Unit Head -- Department Task-- (Return)*/       //unit_head_returned
         async UnitHeadReturned(req, res)
      {   
         let Dept_name                        = req.logged_in_user.department;
         let ticket_model                     = new TICKET_MODEL();
         let Unit_head_returned               = await ticket_model.find({status:"Returned", submitted_to:Dept_name})
         return global.controller.handleSuccess(req, res, { response_data: Unit_head_returned });
      }

       /*Unit Head -- Department Task-- (Return)*/       //unit_head_misrouted
       async UnitHeadMisrouted(req, res)
       {   
          let Dept_name                        = req.logged_in_user.department;
          let ticket_model                     = new TICKET_MODEL();
          let Unit_head_Misrouted               = await ticket_model.find({status:"Misrouted", submitted_to:Dept_name})
          return global.controller.handleSuccess(req, res, { response_data: Unit_head_Misrouted });
       }

    //--------------------------RANK-IN-FILE---------------------------------//
        /*Rank-In-File ---Tasklist---MyTask)*/       //rank_in_file_tasklist
        async EmpMyTask(req, res)
        {     
        let Assignee                         = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let emp_mytask                       = await ticket_model.find({status:"Assigned", assignee:Assignee})
        return global.controller.handleSuccess(req, res, { response_data: emp_mytask });
        }
           /*Rank-In-File ---Tasklist---Submitted)*/       //rank_in_file_submitted//
        async EmpSubmitted(req, res)
        {   
         
        let Requestor                        = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let emp_submitted                    = await ticket_model.find({status:"Open", requestor:Requestor})
        return global.controller.handleSuccess(req, res, { response_data: emp_submitted});
        }
           /*Rank-In-File --Task List-- (InProgress)*/          //rank_in_file_inprogress
        async EmpInprogress(req, res)
         {   
        let Assignee                         = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let emp_done                         = await ticket_model.find({status:"Assigned", assignee:Assignee})
        return global.controller.handleSuccess(req, res, { response_data: emp_done });

         }
           /*Rank-In-File ---Tasklist---forReview)*/       //rank_in_file_review
        async EmpForReview(req, res)
        {   
        let Assignee                         = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let emp_review                       = await ticket_model.find({status:"Closed", requestor:Assignee})
        return global.controller.handleSuccess(req, res, { response_data: emp_review });
        }
           /*Rank-In-File ---Tasklist---Done)*/       //rank_in_file_done
        async EmpDone(req, res)
        {   
        let Assignee                         = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let emp_done                         = await ticket_model.find({status:"Resolved", assignee:Assignee})
        return global.controller.handleSuccess(req, res, { response_data: emp_done });
        }
        //----------------------Admin tasklist------------------------------------//

        /* Admin Submitted*/                    //get_admin_submitted
        async adminSubmitted (req, res)
        {    
        let AdminLog                         = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let adminSub                         = await ticket_model.find({status:"Open", requestor:AdminLog})
        return global.controller.handleSuccess(req, res, { response_data: adminSub});
        }
        async adminInprogress (req, res)     //get_admininprogress
        {    
        let AdminLog                         = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let adminInprogress                   = await ticket_model.find({status:"Assigned", requestor:AdminLog})
        return global.controller.handleSuccess(req, res, { response_data: adminInprogress});
        }

        async adminForReview (req, res)         //get_adminforreview
        {
        let AdminLog                         = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let adminForReview                   = await ticket_model.find({status:"Closed", requestor:AdminLog})
        return global.controller.handleSuccess(req, res, { response_data: adminForReview});
        }
        
        async adminCompleted (req, res)            //get_admincompleted
        {
        let AdminLog                         = req.logged_in_user.firstname+" "+req.logged_in_user.lastname
        let ticket_model                     = new TICKET_MODEL();
        let adminCompleted                   = await ticket_model.find({status:"Resolved", requestor:AdminLog})
        return global.controller.handleSuccess(req, res, { response_data: adminCompleted});
        }

      }
    
  