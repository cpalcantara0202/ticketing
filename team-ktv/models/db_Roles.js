const MONGOOSE  = require('../config/mongo');
const MODEL     = require('../models/model');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema
({
    role_number            :  { type: Number, trim: true, default : '', required: true },
    role_name              :  { type: String, trim: true, default : '', required: true },
  },
{
    timestamps : { createdAt   : 'created_at', updatedAt   : 'updated_at' }
});

module.exports = class db_Innova_users extends MODEL
{
    constructor ()
    {
        super('User Roles', schema);

        this.response_fields    = [];
    }
async getLatestRoleNumber()
    {
    const collection = this.collection;
    const res2 = await collection.findOne(null, null, { sort: { role_number: - 1 }});
    this.data = res2;
    return this.data;
    }
}
