let _db_user = require("../models/db_user");

module.exports = async (value) =>
{
    let db_user = new _db_user();
    let check_username = await db_user.findByUsername(value);

    if(!check_username)
    {
        return Promise.reject("The username you entered doesn't exist");
    } 
}