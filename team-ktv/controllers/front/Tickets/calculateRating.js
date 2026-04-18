const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://cpalcantara02:Thesis2023@cluster0.lqi7lcv.mongodb.net/db_Innova'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = class TemplateController {

  async calculateRating( req,res) {
  
    await client.connect();
    const database     = client.db('db_Innova');
    const collection   = database.collection('Tickets');
    const filter       = {assignee:req.logged_in_user.firstname+" "+req.logged_in_user.lastname}
    let user           = req.logged_in_user.firstname+" "+ req.logged_in_user.lastname
    const result       = await collection.aggregate([
        { $match: filter }, 
        {
          $group: {
            _id: user, 
            Average_Rating: { $avg: "$rating" }, 
          },
        },
        {
          $project: {
            _id: user, 
            Average_Rating: { $round: ["$Average_Rating", 2] }, 
          },
        },
        
      
    ]).toArray();
      console.log(result);
      return global.controller.handleSuccess(req, res, { response_data: result});
    }
    
  }
  
