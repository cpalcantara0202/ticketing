require('dotenv').config();
const MONGOOSE      = require('mongoose');
let connection_url  = process.env.mongo_db_connection_string;

MONGOOSE.set('strictQuery', true);
MONGOOSE.connect(connection_url,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, async function(error)
{
    if (error)
    {
        console.log("ERROR", error);
        console.log('access denied');
    }
});

MONGOOSE.pluralize(null);

module.exports = MONGOOSE;