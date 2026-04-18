const { MongoClient } = require('mongodb');
const { all }       = require('axios');
const mainDepts     = require('../../models/db_Department');
const Users = require('../../models/db_Innova_users');



module.exports = class TemplateController
{
    //add main department
    async create_dept(req,res){
        
        let maindepts = new mainDepts();
       
        /* get next major department number */
         let get_latest_dept = await maindepts.getLatestDepartment();//auto-increment
         let next_dept_id;

         if(get_latest_dept==null||get_latest_dept =="")
         {
             next_dept_id=1
         }
         else
         {
             next_dept_id = get_latest_dept.department_number + 1;
         }
              if (!req.body.cluster_code || req.body.cluster_code.trim() == "") //textbox
              {
              return global.controller.handleError(req, res, "Cluster code must be selected.");
              }
              else if (!req.body.department_name || req.body.department_name.trim() == "") //textbox
              {
              return global.controller.handleError(req, res, "Department name must be filled up.");
              }
             
             else
              {   
                 req.body.department_number      = next_dept_id;     
                 req.body.cluster_code           = req.body.cluster_code;
                 req.body.department_name        = req.body.department_name;

               // console.log(req.body);
                let maindepts = new mainDepts();
                let check_department  = await maindepts.findOne({department_name:req.body.department_name});
                
                if(check_department)
                {
                    return global.controller.handleError(req, res, "Department name already exist");
                }
                else
                {
                    let created_dept  = await maindepts.add(req.body);
                    return global.controller.handleSuccess(req, res, { response_data: created_dept });
                }     
             }    
         }   
         //send to archived
    async sendtoArchive(req, res) {
        let department_number = req.body.department_number;
        let department_status=0;
        let maindepts = new mainDepts();
        await maindepts.collection.findOneAndUpdate({ department_number },department_status); 
        return global.controller.handleSuccess(req, res, { response_data: department_status });   
    }
     //retrieve active user(1)
     async getActive(req, res) {
        let users                   = new Users();;
        let users_active            = await users.find({ status: '1', });
        let return_data             = [];
        let i                       = 0;
        for(let user of users_active) {
            return_data[i] = {};
            return_data[i]["user_number"] = user.user_number;
            return_data[i]["username"] = user.username;
            return_data[i]["full_name"] = user.firstname + " " + user.lastname;
            return_data[i]["department"] = user.department;

            switch (user.user_role) {
                case 1: return_data[i]["role_name"] = 'Administrator'; break;
                case 2: return_data[i]["role_name"] = 'Unit Head'; break;
                case 3: return_data[i]["role_name"] = 'Rank and File'; break;
            }

            // return_data.push(user);

            i++;
        }

        console.log(return_data);

        return global.controller.handleSuccess(req, res, { response_data: return_data });
    }
    //retrieve archived user(0)
    async getArchived(req, res) {
        let users                   = new Users();;
        let users_archive           = await users.find({ status: '0', });
        let return_data             = [];
        let i                       = 0;
        for(let user of users_archive) {
            return_data[i] = {};
            return_data[i]["user_number"] = user.user_number;
            return_data[i]["username"] = user.username;
            return_data[i]["full_name"] = user.firstname + " " + user.lastname;
            return_data[i]["department"] = user.department;

            switch (user.user_role) {
                case 1: return_data[i]["role_name"] = 'Administrator'; break;
                case 2: return_data[i]["role_name"] = 'Unit Head'; break;
                case 3: return_data[i]["role_name"] = 'Rank and File'; break;
            }

            // return_data.push(user);

            i++;
        }

        console.log(return_data);

        return global.controller.handleSuccess(req, res, { response_data: return_data });
    }
    async getAllDept(req, res) {

        let mainDept                 = new mainDepts();
        let allDepartment           = await mainDept.find({});
        //console.log(allDepartment);    
        return global.controller.handleSuccess(req, res, { response_data: allDepartment });
    }

}