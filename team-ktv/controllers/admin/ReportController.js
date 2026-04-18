const db_user = require('../../models/db_Innova_users');
const db_task = require('../../models/db_ticket');


module.exports = class ReportController {
    async employeeReport(req, res) {
        let db_employee = new db_user();
        let db_ticket = new db_task();
        let employee_list = await db_employee.find({ department: req.logged_in_user.department });
        let return_data = [];

        let i = 0;
        for(let employee of employee_list) {
            let full_name = employee.firstname + " " + employee.lastname;

            let task_list = await db_ticket.find({ assignee: full_name });

            let ongoing = 0;
            let completed = 0;
            let resolved = 0;
            let rating = 0;
            let totalRating = 0;

            for(let task of task_list) {
                if(task.status == 'Assigned') {
                    ongoing++;
                }
                if(task.status == 'Closed') {
                    completed++;
                }
                if(task.status == 'Resolved') {
                    resolved++;
                    rating = (rating + task.rating);
                }
            }

            for(let task of task_list) {
                if(task.status == 'Resolved') {
                    totalRating = ((rating / resolved).toFixed(2));
                }
            }

            return_data[i] = {};
            return_data[i]["employee_id"] = employee.user_number;
            return_data[i]["full_name"] = full_name;
            return_data[i]["ongoing"] = ongoing;
            return_data[i]["completed"] = completed;
            return_data[i]["resolved"] = resolved;
            return_data[i]["rating"] = totalRating;

            console.log(return_data[i]);
            i++;
        }

        return global.controller.handleSuccess(req, res, { response_data: return_data });
    }
    async indiReport(req, res) 
    {
        let individual_report               = req.logged_in_user.department
        let dbticket                        = new db_task();
        let allResolve                      = await dbticket.find({submitted_to:individual_report, status:'Resolved'})
        return global.controller.handleSuccess(req, res, { response_data: allResolve});
    }
}
