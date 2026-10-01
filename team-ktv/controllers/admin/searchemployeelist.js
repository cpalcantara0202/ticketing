const { all } = require('axios');
const Users = require('../../models/db_Innova_users');
const TICKET_MODEL = require('../../models/db_ticket');

module.exports = class TemplateController {

   // search active employee list  by unit head for assigning                         //search_employee
    async searchEmployeeList (req, res){
        
        let employee_list                   = req.logged_in_user.department
        let users                           = new Users();
        let allemplist                      = await users.find({department: employee_list,status:'1'})
        return global.controller.handleSuccess(req, res, { response_data: allemplist });
    }

    // Department employees with their average rating (for the Assignor view)   //employee_ratings
    async employeeRatings (req, res){

        let department                      = req.logged_in_user.department
        let users                           = new Users();
        let ticket_model                    = new TICKET_MODEL();

        // All employees in the Assignor's department (active + deactivated)
        let allemplist                      = await users.find({ department: department })

        let response_data                   = [];

        for (let emp of allemplist) {
            let fullName = emp.firstname + " " + emp.lastname;

            // Average rating + count across this employee's resolved tickets
            let agg = await ticket_model.aggregate([
                { $match: { assignee: fullName, status: 'Resolved' } },
                {
                    $group: {
                        _id: fullName,
                        average_rating: { $avg: "$rating" },
                        rated_tickets: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        average_rating: { $round: [{ $ifNull: ["$average_rating", 0] }, 2] },
                        rated_tickets: 1,
                    },
                },
            ]);

            let stats = agg && agg.length > 0 ? agg[0] : { average_rating: 0, rated_tickets: 0 };

            response_data.push({
                user_number: emp.user_number,
                firstname: emp.firstname,
                lastname: emp.lastname,
                department: emp.department,
                user_role: emp.user_role,
                status: emp.status,
                total_tickets_assigned: emp.total_tickets_assigned,
                total_tickets_closed: emp.total_tickets_closed,
                average_rating: stats.average_rating || 0,
                rated_tickets: stats.rated_tickets || 0,
            });
        }

        return global.controller.handleSuccess(req, res, { response_data: response_data });
    }
}