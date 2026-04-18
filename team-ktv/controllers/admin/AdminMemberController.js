const TableClass = require('../../classes/TableClass');
const DB_USER = require('../../models/db_user');

module.exports = class AdminMemberController 
{
    async getList(req, res) 
    {
		let return_data 	= {};
		let db_user 		= new DB_USER();
		let table_class 	= new TableClass(db_user);
		let filter 			= { user_type: 'customer' };

		await table_class.loadTableData(req.query, filter);

		return_data.table_data = table_class.table_data;

		return global.controller.handleSuccess(req, res, return_data);
    }

    async saveUser(req, res)
    {
		let _id             = req.body._id;
		let db_user         = new DB_USER();

		let check_id 		= await db_user.findById(_id);

		if(!check_id)
		{
			return global.controller.handleError(req, res, "Invalid ID");  
		}
		else if(check_id.is_archived == 1)
		{
			return global.controller.handleError(req, res, `${_id} was already archived.`);
		}
		else
		{
			await db_user.update(_id, req.body);
		}

		return global.controller.handleSuccess(req, res, { message: 'User Information has been updated.', response_data: db_user.data });
    }
}