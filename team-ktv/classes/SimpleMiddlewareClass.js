const db_Innova_users = require('../models/db_Innova_users.js');

module.exports =
{
    async memberOnly(req, res, next) {
        let db_user = new db_Innova_users();
        
        if(!req.headers.hasOwnProperty('logged_in_user')) {
            return global.controller.handleError(req, res, "This API is only accessible if you are logged-in.");
        }
        else {
            let logged_in_account
            try {
                logged_in_account = await db_user.findOne({ _id: req.headers.logged_in_user }); 
            } catch (error) {
                logged_in_account = null;
            }

            if(!logged_in_account) {
                return global.controller.handleError(req, res, "This API is only accessible if you are logged-in. (Account does not exit)");
            }
            else {
                req.logged_in_user = logged_in_account;
                next();
            }

        }
    }
}