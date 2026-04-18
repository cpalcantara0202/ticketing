const Users = require('../../models/db_Innova_users');
const { all }           = require('axios');

module.exports = class TemplateController {

    //add Innova users//
    async addUser(req, res) {

        let users = new Users();
        /* get next ticket id */
        let get_latest_EmpId = await users.getLatestEmployeeNumber();//auto-increment
        let next_Empid;

        if (get_latest_EmpId == null || get_latest_EmpId == "") {
            next_Empid = 1
        }
        else
        {
            next_Empid = get_latest_EmpId.user_number + 1;
        }     
        let save_user           = {};
        save_user.user_number   = next_Empid;//textbox
        save_user.firstname     = req.body.firstname;//textbox
        save_user.lastname      = req.body.lastname;//textbox
        save_user.department    = req.body.department;//dropbox
        save_user.username      = req.body.username;//textbox
        save_user.password      = req.body.password;//textbox
        save_user.password_conf = req.body.password_conf;//textbox
        save_user.user_role     = req.body.user_role;//combobox

        if (save_user.firstname == null || save_user.firstname == "") {
            return global.controller.handleError(req, res, "Firstname must be filled up.");
        }
        else if (save_user.lastname == null || save_user.lastname == "") {
            return global.controller.handleError(req, res, "Lastname must be filled up.");
        }
        else if (save_user.department == null || save_user.department == "") {
            return global.controller.handleError(req, res, "Department must be filled up.");
        }
        else if (save_user.username == null || save_user.username == "") {
            return global.controller.handleError(req, res, "Username must be filled up.");
        }
        else if (save_user.password == null || save_user.password == "") {
            return global.controller.handleError(req, res, "Password must be filled up.");
        }
        else if((save_user.password.length < 6) )
        {
            return global.controller.handleError(req, res, "Password less than 6 characters");
        }
        else if (save_user.password != save_user.password_conf || save_user.password_conf == null || save_user.password_conf == "") {
           
            return global.controller.handleError(req, res, "Password did not match");
        }
        else {
            //check if userid or username exists
            console.log(req.body);
            let users = new Users();
            let check_username   = await users.findOne({ username: req.body.username });

            if (check_username) {
                return global.controller.handleError(req, res, "Username already exist");
            }
            else 
            {
                await users.add(save_user);
                return global.controller.handleSuccess(req, res, { response_data: "User Successfully Created" });
            }
        }
    }
    //Login and login check//
    async logIn(req, res) {

        let users        = new Users();
        const check      = await users.findOne({ username: req.body.username })
    
        if (!check) 
        {
            return global.controller.handleError(req, res, "Account doesn't exist.");
        }
        else if (check.password == req.body.password)
        {       
            console.log(check);
            
                    if (check.user_role=='1')

                     {
                         return global.controller.handleSuccess(req, res, { response_data: "Sucessfully Logged-In as Admin", user_info: check }); 
                     }
              
                    else if (check.user_role=='2')
                     {
                        return global.controller.handleSuccess(req, res, { response_data: "Sucessfully Logged-In as Unit Head", user_info: check });   
                     }
                    
                    else
                     {

                         return global.controller.handleSuccess(req, res, { response_data: "Sucessfully Logged-In as Rank-in-file", user_info: check });   
                     }
              }           
         else
        {        
            return global.controller.handleError(req, res, "Invalid Password");

        }   
 }

   //retrieve unit headList
    async getListunithead(req, res) {

        let users = new Users();
        let unitHeadlist = await users.find({ user_role: 2 });
        return global.controller.handleSuccess(req, res, { response_data: unitHeadlist });
    
    }
    /*Change password*/
    async changePassword(req, res) {

        let user_number = req.body.user_number;
        let users = new Users();
        let Password = req.body.password;
        let Conf_password = req.body.password_conf;
       
        if (Password != Conf_password) {
            return global.controller.handleError(req, res, "Password did not match");
        }
        else if((Password.length < 6) )
        {
            return global.controller.handleError(req, res, "Password less than 6 characters");
        }
        else    
        {
            await users.collection.findOneAndUpdate({ user_number }, req.body);
            return global.controller.handleSuccess(req, res, { response_data: "Password succesfully change" });
        }
        
    }
    async viewActive(req, res)
    {
        let users       = new Users();
        let Archive     = await db_member.find({ age: 15 });
        console.log(member_list);
        return global.controller.handleSuccess(req, res, { response_data: member_list });
    }
    async setArchive(req, res) {
        let user_number             = req.body.user_number
        let archiveStatus           = 0
        req.body.status             = archiveStatus
        let users                   = new Users();
        await users.collection.findOneAndUpdate({ user_number }, req.body);
        return global.controller.handleSuccess(req, res, { response_data: archiveStatus});
    }
    async setActive(req, res) {
        let user_number             = req.body.user_number
        let activeStatus            = 1
        req.body.status             = activeStatus
        let users                   = new Users();
        await users.collection.findOneAndUpdate({ user_number }, req.body);
        return global.controller.handleSuccess(req, res, { response_data: activeStatus});
    }
}