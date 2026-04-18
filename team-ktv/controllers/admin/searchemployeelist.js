const { all } = require('axios');
const Users = require('../../models/db_Innova_users');

module.exports = class TemplateController {

   // search active employee list  by unit head for assigning                         //search_employee
    async searchEmployeeList (req, res){
        
        let employee_list                   = req.logged_in_user.department
        let users                           = new Users();
        let allemplist                      = await users.find({department: employee_list,status:'1'})
        return global.controller.handleSuccess(req, res, { response_data: allemplist });
    }  
}