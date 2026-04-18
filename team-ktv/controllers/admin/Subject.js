const Subject           = require('../../models/db_Subject');
const { all }           = require('axios');

module.exports = class TemplateController {

    //add Subject//
    async addSubject(req, res) {            //save_subject

        let subject             = new Subject();
        let save_subject        = {};
        save_subject.Subject       = req.body.Subject;
        await subject.add(save_subject);
        return global.controller.handleSuccess(req, res, { response_data: "Subject Successfully Created" });

    }
        async viewSubject (req, res)            //get_subject
        {
        let subject                          = new Subject();
        let getSub                           = await subject.find({})
        return global.controller.handleSuccess(req, res, { response_data: getSub});
    }
}