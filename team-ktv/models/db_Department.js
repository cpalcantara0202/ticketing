const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./model');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema
({
    department_number               :  { type: Number, trim: true, default : '', required: true },
    cluster_code                    :  { type: String, trim: true, default : '', required: true },
    department_name                 :  { type: String, trim: true, default : '', required: true },
    department_status               :  { type: String, trim: true, default : '1', required: true }, 
},
{
    timestamps : { createdAt   : 'created_at', updatedAt   : 'updated_at' }
});

module.exports = class db_Department extends MODEL
{
    constructor ()
    {
        super('Department', schema);

        this.response_fields    = [];
    }
    async getLatestDepartment() {
        const collection = this.collection;
        const res = await collection.findOne(null, null, { sort: { department_number: - 1 }});
        this.data = res;
        return this.data;
    }
}