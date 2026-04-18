const  Roles   = require('../../models/db_Roles');

module.exports = class TemplateController{

        //add Innova roles//
         async addRoles(req, res){
       
        let roles            = new Roles();
        /* get next role number*/
        let get_latest_role = await roles.getLatestRoleNumber();//auto-increment
        let next_role_num ;

                if(get_latest_role==null||get_latest_role =="")
                {
                    next_role_num=1
                }
                else
                {
                    next_role_num = get_latest_role.role_number + 1;
                }  
            let save_role              ={};
            save_role.role_number      =next_role_num;//textbox
            save_role.role_name        =req.body.role_name;//textbox
          
            if   (save_role.role_name==null||save_role.role_name=="")
            {
                return global.controller.handleError(req, res, "Role name must be filled up.");
            }      
            else
            {
                await roles.add(save_role);
                res.send("Successfully added!");
            }          
        }
     }
   