const Users = require('../../models/db_Innova_users');
const { all }           = require('axios');
const bcrypt            = require('bcrypt');

const BCRYPT_ROUNDS = 10;

// Detect a bcrypt hash so we can support both freshly-hashed accounts and any
// legacy plaintext rows during transition.
function isBcryptHash(value)
{
    return typeof value === 'string' && /^\$2[aby]\$\d{2}\$/.test(value);
}

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
                // Hash the password before persisting; never store plaintext.
                const hashed = await bcrypt.hash(save_user.password, BCRYPT_ROUNDS);
                save_user.password = hashed;
                save_user.password_conf = hashed;
                await users.add(save_user);
                return global.controller.handleSuccess(req, res, { response_data: "User Successfully Created" });
            }
        }
    }
    //Login and login check//
    async logIn(req, res) {

        let users        = new Users();
        const check      = await users.findOne({ username: req.body.username })

        const fail = (message) => {
            // Inertia form submissions expect a redirect back with flash errors;
            // fall back to JSON for non-Inertia callers.
            if (req.headers['x-inertia'] === 'true' || req.session) {
                if (req.session) req.session.errors = { login: message };
                return res.inertiaLocation('/login');
            }
            return global.controller.handleError(req, res, message);
        };

        if (!check)
        {
            return fail("Account doesn't exist.");
        }

        // Verify password: support bcrypt hashes, and transparently upgrade any
        // legacy plaintext row to a hash on successful login.
        let passwordOk = false;
        if (isBcryptHash(check.password))
        {
            passwordOk = await bcrypt.compare(req.body.password, check.password);
        }
        else
        {
            passwordOk = check.password === req.body.password;
            if (passwordOk)
            {
                try {
                    const hashed = await bcrypt.hash(req.body.password, BCRYPT_ROUNDS);
                    await users.update(check._id, { password: hashed, password_conf: hashed });
                } catch (e) { /* non-fatal: upgrade on next login */ }
            }
        }

        if (!passwordOk)
        {
            return fail("Invalid Password");
        }

        // Establish the session. Store only safe, non-sensitive fields.
        const sessionUser = {
            _id: String(check._id),
            user_number: check.user_number,
            firstname: check.firstname,
            lastname: check.lastname,
            department: check.department,
            username: check.username,
            user_role: check.user_role,
        };

        if (req.session)
        {
            req.session.user = sessionUser;
        }

        // Inertia flow: redirect based on role.
        if (req.headers['x-inertia'] === 'true' || req.session)
        {
            const target = String(check.user_role) === '1' ? '/admin' : '/';
            return res.inertiaLocation(target);
        }

        // Legacy JSON flow (kept for any remaining API callers).
        return global.controller.handleSuccess(req, res, { response_data: "Successfully Logged-In", user_info: sessionUser });
    }

    //Logout: destroy the session//
    async logOut(req, res) {
        if (req.session)
        {
            req.session.destroy(() => {});
        }
        return res.inertiaLocation('/login');
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