let _db_user = require("../models/db_user");

module.exports = async (value) =>
{
    let db_user = new _db_user();
    let check_email = await db_user.findByEmail(value);

    if(check_email)
    {
        return Promise.reject("The email you entered already exist");
    } 
}