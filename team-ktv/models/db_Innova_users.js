const MONGOOSE  = require('../config/mongo');
const MODEL     = require('../models/model');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema
({
    user_number                               :  { type: Number, trim: true, default : '' , required: true },
    firstname                                 :  { type: String, trim: true, default : '' , required: true },
    lastname                                  :  { type: String, trim: true, default : '' , required: true },
    department                                :  { type: String, trim: true, default : '' , required: true },
    username                                  :  { type: String, trim: true, default : '' , required: true },
    password                                  :  { type: String, trim: true, default : '' , required: true },
    password_conf                             :  { type: String, trim: true, default : '' , required: true },
    user_role                                 :  { type: Number, trim: true, default : '' , required: true },
    status                                    :  { type: Number, trim: true, default : '1', required: true },
    total_tickets_assigned                    :  { type: Number, trim: true, default : '', required: false },
    total_tickets_closed                      :  { type: Number, trim: true, default : '', required: false },
    total_rating                              :  { type: Number, trim: true, default : '', required: false },
},
{
    timestamps : { createdAt   : 'created_at', updatedAt   : 'updated_at' }
});

module.exports = class db_Innova_users extends MODEL
{
    constructor ()
    {
        super('Innova Users', schema);

        this.response_fields    = [];
    }

async getLatestEmployeeNumber() {

    const collection = this.collection;
    const ress = await collection.findOne(null, null, { sort: { user_number: - 1 }});
    this.data = ress;
    return this.data;
    }
}
