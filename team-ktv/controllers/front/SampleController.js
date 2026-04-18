const DB_MEMBER = require("../../models/db_member");

module.exports = class TemplateController
{
    async testing(req, res)
    {

        let x = 10;

        let output = {
            test: 1,
            test2: 2,
            test3: 4,
        }

        return global.controller.handleSuccess(req, res, { response_data: output });
    }
    async test_post_information(req, res)
    {
        let db_member       = new DB_MEMBER();
        let save_data       = {};
        save_data.username  = req.body.username;
        save_data.password  = req.body.password;
        save_data.age       = req.body.age;
        await db_member.add(save_data);
        res.send("testing");
    }
    async getMemberList(req, res)
    {
        let db_member       = new DB_MEMBER();
        let member_list     = await db_member.find({ age: 15 });
        console.log(member_list);
        return global.controller.handleSuccess(req, res, { response_data: member_list });
    }
}