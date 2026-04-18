const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./model');
const Schema    = MONGOOSE.Schema;

const schema    = new Schema
({
    Subject              :  { type: String, trim: true, default : '', required: true },
  },
{
    timestamps : { createdAt   : 'created_at', updatedAt   : 'updated_at' }
});

module.exports = class db_Subject extends MODEL
{
    constructor ()
    {
        super('Subject List', schema);

        this.response_fields    = [];
    }
}