const TICKET_MODEL      = require('../../models/db_ticket');
const Users             = require('../../models/db_Innova_users');

module.exports = class TemplateController {

  async filter_by_date(req, res)      //get_filter_by_date
 {     
  const { startDate, endDate } = req.body;

        try {
            let ticket_model  = new TICKET_MODEL();

            const tickets = await ticket_model.find({
                assigned_date: {
                    $gte: new Date(startDate), 
                    $lte: new Date(endDate)    
                }
            });
      console.log(tickets)
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
 }
}
