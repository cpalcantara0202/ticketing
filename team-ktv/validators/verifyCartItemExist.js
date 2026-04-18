let DB_CART = require("../models/db_cart");

module.exports = async (item_id, header) =>
{
    const db_cart       = new DB_CART();
    let user_id         = header.req.auth_user_info._id;
    let check_cart      = await db_cart.findOne({ item_id, user_id });

    if(!check_cart)
    {
        return Promise.reject("Cart Item not found.");
    } 
}