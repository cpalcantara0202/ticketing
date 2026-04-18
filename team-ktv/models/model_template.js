const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./model');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema
({
    param1 : { type: String, trim: true, default : '', required: true },
    param2 : { type: Number, trim: true, default : 0, required: true },
    param3 : { type: Boolean, trim: true, default : true, required: true },
},
{
    timestamps : { createdAt   : 'created_at', updatedAt   : 'updated_at' }
});

module.exports = class db_user extends MODEL
{
    constructor ()
    {
        super('tests', schema);

        this.response_fields    = [];
    }
}