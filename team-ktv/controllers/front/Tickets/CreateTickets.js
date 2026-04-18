const { DATE }          = require('sequelize');
const TICKET_MODEL      = require('../../../models/db_ticket');
const moment            = require('moment');
const { MongoClient }   = require('mongodb');
const uri               = 'mongodb+srv://cpalcantara02:Thesis2023@cluster0.lqi7lcv.mongodb.net/db_Innova'; 
const client            = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });    

module.exports = class TemplateController
{
    async create_tickets (req, res)
    {
        let ticket_model = new TICKET_MODEL();
        /*set the ticket status to open upon creation*/
        let ticket_status=['Open']
        let ticket_stat = ticket_status[0];

        /* get next ticket id */
        let get_latest_ticket = await ticket_model.getLatestTicket();//auto-increment
        let next_ticket_id;
        
                if(get_latest_ticket==null||get_latest_ticket =="")
                {
                        next_ticket_id=1
                }
                else
                {
                 next_ticket_id= get_latest_ticket.ticketid + 1;
                }

        if     (!req.body.subject || req.body.subject.trim() == "") {//comment box
            return global.controller.handleError(req, res, "Subject must be filled up.");
        }
        else if(!req.body.category || req.body.category.trim() == "") {//dropbox
            return global.controller.handleError(req, res, "Category must be filled up.");
        }
        else if(!req.body.description || req.body.description.trim() == "") {//comment box
            return global.controller.handleError(req, res, "Description must be filled up.");
        }
        else if(!req.body.priority || req.body.priority.trim() == "") {//dropbox
            return global.controller.handleError(req, res, "Priority must be filled up.");
        }
        else
        {   
            let SelectedDate                  = req.body.date
            if(SelectedDate == undefined) {
                req.body.deadline               = "Not Specified"
            }
            else{
                const ticketDeadline            = moment(new Date(req.body.date)).format('LLL');
                req.body.deadline               = ticketDeadline
            }
            let Assign_Date                     = moment().format('LLL');
            let formatted_assign_date           = Assign_Date
            req.body.ticketid                   = next_ticket_id;
            req.body.subject                    = req.body.subject
            req.body.category                   = req.body.category
            req.body.description                = req.body.description
            req.body.requestor                  = req.logged_in_user.firstname + " " + req.logged_in_user.lastname
            req.body.requestor_dept             = req.logged_in_user.department
            req.body.assign_date                = formatted_assign_date
            req.body.priority                   = req.body.priority
            req.body.status                     = ticket_stat
            req.body.assigned_date              = " "
            req.body.submitted_to               = req.body.submitted_to
            req.body.assignee                   = " "
            req.body.completed_date             = " "
            req.body.returned_date              = " "
            req.body.rating                     = req.body.rating
            req.body.description_reject         = " "


            if (req.body.requestor_dept==req.body.submitted_to)
            {
                return global.controller.handleError(req, res, { response_data:"Same Department destination! Please assign to right department"});
            }
            else
            {
                console.log(SelectedDate);
                let created_ticket                  = await ticket_model.add(req.body)
                return global.controller.handleSuccess(req, res, { response_data: created_ticket })
            }
            
        }
    }
        async edit_ticket(req, res) {
        let ticketid = req.body.ticketid;
        let ticket_model = new TICKET_MODEL();
        await ticket_model.collection.findOneAndUpdate({ ticketid }, req.body);
        return global.controller.handleSuccess(req, res, { response_data: ticketid });
    }
}