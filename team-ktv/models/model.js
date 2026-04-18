const MONGOOSE              = require('../config/mongo');
const moment                = require('moment');
module.exports              = class MODEL 
{
    constructor(collection, schema) 
    {
        this.config                 = getConfig();
        this.collection_name        = collection;
        this.schema                 = schema;
        this.collection             = MONGOOSE.model(collection, schema, collection);
        this.mongoose               = MONGOOSE;
        this.list                   = [];
        this.response_list          = [];
        this.data                   = {};
        this.response_data          = {};
    }

    getSchema()
    {
        return this.schema;
    }
    async collection()
    {
        return this.collection;
    }
    
    async watcher()
    {
        let changeStream = this.collection.watch();
        return changeStream;
    }
    async paginate({filter, sort, skip, limit})
    {
        const res = await this.collection.find(filter, null, { skip, limit, sort });
        return res ? res : null;
    }
    async batch_by_creation(last_date, filter, limit)
    {
        if(last_date)
        {
            filter.created_at = { '$gt': last_date };
        }

        let sort = { created_at: 1 };

        const res = await this.collection.find(filter).sort(sort).limit(limit);
        
        return res ? res : null;
    }
    async find(filters = {})
    {
        const collection        = this.collection;
        const res               = await collection.find(filters);
        this.list               = res;
        return this.list;
    }
    async findOne(filters = {})
    {
        const collection        = this.collection;
        const res               = await collection.findOne(filters);
        this.data               = res;
        return this.data;
    }
    async findById(id) 
    {
        try
        {
            const collection        = this.collection;
            const res               = await collection.findById(id);
            this.data               = res;
        }
        catch (error)
        {
            this.data               = null;
        }

        return this.data;
    }

    async add(options = {}) 
    {
        const collection        = this.collection;
        const modelObj          = new collection(options);
        const modelRes          = await modelObj.save();
        this.data               = modelRes;

        return modelRes;    
    }

    async update(id, update) 
    {
        const collection        = this.collection;
        const modelRes          = await collection.findByIdAndUpdate(id, update, { new: true });
        this.data               = modelRes;
        return modelRes;
    }
    async removeMany(filters = {}) 
    {
        const collection        = this.collection;
        const modelRes          = await collection.deleteMany(filters);
        return modelRes;
    }
    async remove(filters = {}) 
    {
        const collection        = this.collection;
        const modelRes          = await collection.deleteOne(filters);
        return modelRes;
    }
    async aggregate(params = [])
    {
        const collection        = this.collection;
        const modelRes          = await collection.aggregate(params);
        return modelRes;
    }
    async constructResponse(response_fields = null)
    {
        // create a construct response data
        let fields = (!response_fields ? this.response_fields : response_fields)

        for(let field of fields)
        {
            this.response_data[field] = this.data[field];
        }

        // create a construct response list
        if(this.list.length > 0)
        {
            for(let list of this.list)
            {
                console.log(list);
            }
        }
    }
    async addFormattedDates(data_columns = [])
    {
        this.list = JSON.parse(JSON.stringify(this.list));
        this.data = JSON.parse(JSON.stringify(this.data));

        data_columns.push('created_at');
        data_columns.push('updated_at');

        /* for the list */
        for(let columns of this.list)
        {
            columns = await this.__addFormattedDates(columns, data_columns);
        }

        /* for the data */
        this.data = await this.__addFormattedDates(this.data, data_columns);
    }
    async __addFormattedDates(data, data_columns)
    {
        data["formatted_dates"] = {};

        for(let index of data_columns)
        {
            data["formatted_dates"][index + "_date"] =  moment(data[index]).format(system_config.date_format);
            data["formatted_dates"][index + "_date_time"] = moment(data[index]).format(system_config.date_time_format);

        }

        return data;
    }
    async __constructFieldResponse()
    {

    }
}