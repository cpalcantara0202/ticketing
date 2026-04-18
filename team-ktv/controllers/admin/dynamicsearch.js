const Users             = require('../../models/db_Innova_users');

module.exports = class TemplateController {

  async dynamicSearch(req, res)    
 {     
     try {
            let user  = new Users();

            const dbusers = await user.find({
                "$or":[
                    {firstname:{$regex:req.body.key}},
                    {lastname:{$regex:req.body.key}}
                ]
            });
            return global.controller.handleSuccess(req, res, { response_data: dbusers});

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
 }
}
