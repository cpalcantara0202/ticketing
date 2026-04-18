let DB_ITEM = require("../models/db_item");

module.exports = async (value) =>
{
    const db_item       = new DB_ITEM();
    let check_item     = await db_item.findById(value);
    
    if(!check_item)
    {
        return Promise.reject("Item not found.");
    } 
}