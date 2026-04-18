const Users = require('../../../models/db_Innova_users');
const TICKET_MODEL = require('../../../models/db_ticket');

module.exports = class reportsResolved {
    
    async getOngoing(req, res) {
        let db_employee = new Users();
        let db_ticket = new TICKET_MODEL();
        let employee_list = await db_employee.find({ department: req.logged_in_user.department });
        let return_data = [];

        let i = 0;
        for (let employee of employee_list) {
            let full_name = employee.firstname + " " + employee.lastname;
            
            let task_list = await db_ticket.find({ assignee: full_name });

            let ongoing = 0;

            for (let task of task_list) {
                if (task.status == 'Assigned') {
                    ongoing++;
                }
            }

            return_data[i] = {};
            return_data[i]["employee_id"] = employee.user_number;
            return_data[i]["full_name"] = full_name;
            return_data[i]["ongoing"] = ongoing;

            console.log(return_data[i]);
            i++;
        }

        return global.controller.handleSuccess(req, res, { response_data: return_data });
    }
};
