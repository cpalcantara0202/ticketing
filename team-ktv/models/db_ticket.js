const { DATE, DATEONLY } = require('sequelize');
const MONGOOSE  = require('../config/mongo');
const MODEL     = require('./model');
const { String, Date } = require('mongoose/lib/schema/index');
const Schema    = MONGOOSE.Schema;
const schema    = new Schema

({
    ticketid                :  { type: Number, trim: true, default : '', required: true }, 
    subject                 :  { type: String, trim: true, default : '', required: true },
    category                :  { type: String, trim: true, default : '', required: true },
    deadline                :  { type: String, trim: true, default : 'No Specified', required: false},
    description             :  { type: String, trim: true, default : '', required: true },
    requestor               :  { type: String, trim: true, default : '', required: true }, 
    requestor_dept          :  { type: String, trim: true, default : '', required: true }, 
    assign_date             :  { type: String, trim: true, default : '', required: true }, 
    priority                :  { type: String, trim: true, default : '', required: true },
    status                  :  { type: String, trim: true, default : '', required: true },
    submitted_to            :  { type: String, trim: true, default : '', required: true },
    assigned_date           :  { type: String, trim: true, default : '', required: false },
    assignee                :  { type: String, trim: true, default : '', required: false },
    assignor                :  { type: String, trim: true, default : '', required: false },
    completed_date          :  { type: String, trim: true, default : '', required: false },
    rating                  :  { type: Number, trim: true, default : '', required: false },
    returned_date           :  { type: String, trim: true, default : '', required: false  },
    description_assign      :  { type: String, trim: true, default : '', required: false  },
    description_reject      :  { type: String, trim: true, default : '', required: false  },
    description_pending     :  { type: String, trim: true, default : '', required: false  },
    description_rating      :  { type: String, trim: true, default : '', required: false  },


},
{
    timestamps : { createdAt   : 'created_at', updatedAt   : 'updated_at'}
});

module.exports = class db_createticket extends MODEL
{
    constructor ()
    {
        super('Tickets', schema);

        this.response_fields    = [];
    }
    async getLatestTicket() {
        const collection = this.collection;
        const res = await collection.findOne(null, null, { sort: { ticketid: - 1 }});
        this.data = res;
        return this.data;
    }
}