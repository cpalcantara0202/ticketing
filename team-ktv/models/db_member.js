const MONGOOSE  = require('../config/mongo');
const MODEL     = require('../models/model');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema
({
    username :  { type: String, trim: true, default : '', required: true },
    password :  { type: String, trim: true, default : '', required: true },
    age :       { type: Number, default : 0, required: true },
},
{
    timestamps : { createdAt   : 'created_at', updatedAt   : 'updated_at' }
});

module.exports = class db_user extends MODEL
{
    constructor ()
    {
        super('member', schema);

        this.response_fields    = [];
    }
}