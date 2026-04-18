/* initialize variables */

let event_id                    = global.event_info.newly_added_event_id; 
let ticket_name                 = global.ticket_info.ticket_name; 
let ticket_price                = global.ticket_info.ticket_price; 
let ticket_date_start           = global.ticket_info.ticket_date_start; 
let ticket_date_end             = global.ticket_info.ticket_date_end; 
let ticket_image                = global.ticket_info.ticket_image; 

let admin_id                	= null;
let token                   	= null;

describe('Ticket API', () =>
{
	before((done) => 
	{
		global.chai.request(global.app).post('/v1/admin/login').send({ email: global.auth_credentials.email, password: global.auth_credentials.password }).end((err, res) =>
		{
			token 		= res.body.token;
			admin_id 	= res.body._id;
			done();
		});
	});

	describe('GET /v1/admin/ticket/status', () =>
	{
		it('Should Get ticket Status successfully', (done) =>
		{
			let status = 'archive'
			global.chai.request(app).get('/v1/admin/ticket/status').set('Authorization', `Bearer ${token}`).send({status}).end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

	describe('GET /v1/admin/ticket/get_list', () =>
	{
		it('Should Get ticket List successfully', (done) =>
		{
			global.chai.request(app).get('/v1/admin/ticket/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

	describe('POST /v1/admin/ticket/add', () =>
	{

		it('Should add ticket successfully', (done) => 
		{
			global.chai.request(global.app).post('/v1/admin/ticket/add').set('Authorization', `Bearer ${token}`).send({ event_id: global.event_info.newly_added_event_id, ticket_name, ticket_price, ticket_date_start, ticket_date_end, ticket_image}).end((err, res) => 
			{
				global.expect(res).to.have.status(200);
				global.expect(res.body).to.have.property('status').equal('success');
				global.expect(res.body).to.have.property('status_code').equal(200); 
	
				var jsonData = JSON.parse(res.text);
				global.ticket_info.newly_added_ticket_id = jsonData.response_data._id;
				done();
			});
		}); 

		it('Should fail due to missing ticket info', (done) =>
		{
			let ticket_name;
			global.chai.request(global.app).post('/v1/admin/ticket/add').set('Authorization', `Bearer ${token}`).send({event_id: global.event_info.newly_added_event_id, ticket_name, ticket_price, ticket_date_start, ticket_date_end, ticket_image}).end((err, res) =>
			{
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});

	describe('GET /v1/admin/ticket/:ticket_id', () =>
	{
		it('Should Get ticket info successfully', (done) =>
		{
			global.chai.request(app).get(`/v1/admin/ticket/${global.ticket_info.newly_added_ticket_id}`).set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

	
	describe('GET /v1/admin/ticket/:ticket_id/serials', () =>
	{
		it('Should get ticket serial successfully', (done) =>
		{
			global.chai.request(app).get(`/v1/admin/ticket/${global.ticket_info.newly_added_ticket_id}/serials`).set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

	describe('POST /v1/admin/ticket/edit', () =>
	{
		it('Should edit ticket successfully', (done) =>
		{
			let ticket_name = `edited ticket name`;
			global.chai.request(global.app).post('/v1/admin/ticket/edit').set('Authorization', `Bearer ${token}`).send({ _id: global.ticket_info.newly_added_ticket_id, ticket_name, ticket_price, ticket_date_start, ticket_date_end, ticket_image}).end((err, res) =>
			{
				global.expect(res).to.have.status(200);
				global.expect(res.body).to.have.property('status').equal('success');
				global.expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});

		it('Should fail due to missing ticket info', (done) =>
		{
			let ticket_name;
			global.chai.request(global.app).post('/v1/admin/ticket/edit').set('Authorization', `Bearer ${token}`).send({ _id: global.ticket_info.newly_added_ticket_id, ticket_name, ticket_price, ticket_date_start, ticket_date_end, ticket_image}).end((err, res) =>
			{
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});

	describe('POST /v1/admin/ticket/archive', () =>
    {
        it('Should Archive ticket successfully', (done) =>
        {
            global.chai.request(global.app).post('/v1/admin/ticket/archive').set('Authorization', `Bearer ${token}`).send({ _id: global.ticket_info.newly_added_ticket_id }).end((err, res) =>
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

		it('Should fail due to missing ticket id', (done) =>
        {
			let _id;
            global.chai.request(global.app).post('/v1/admin/ticket/archive').set('Authorization', `Bearer ${token}`).send({ _id}).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });

	describe('POST /v1/admin/ticket/restore', () =>
    {
        it('Should Restore Ticket successfully', (done) =>
        {
            global.chai.request(global.app).post('/v1/admin/ticket/restore').set('Authorization', `Bearer ${token}`).send({ _id: global.ticket_info.newly_added_ticket_id }).end((err, res) =>
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

		it('Should fail due to missing event id', (done) =>
        {
			let _id;
            global.chai.request(global.app).post('/v1/admin/ticket/restore').set('Authorization', `Bearer ${token}`).send({ _id}).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });

	describe('POST /v1/admin/ticket/generate_serial', () =>
	{
		let generatedTicketSerialIds = [];
		
		beforeEach((done) => {

			let count = 2;
			global.chai.request(global.app).post('/v1/admin/ticket/generate_serial').set('Authorization', `Bearer ${token}`).send({ ticket_id: global.ticket_info.newly_added_ticket_id , count}).end((err, res) => 
			{
				global.expect(res).to.have.status(200);
				global.expect(res.body).to.have.property('status').equal('success');
				global.expect(res.body).to.have.property('status_code').equal(200); 

				var jsonData = res.body;
        		// Store the array of generated ticket serial IDs
				var jsonData = JSON.parse(res.text);
				generatedTicketSerialIds.push(jsonData.response_data._id); // Push the _id into the array
				done();
			});
		}); 
		it('Should generate ticket serial successfully', () => 
		{	
			global.ticket_serial_info.newly_added_ticket_serial_ids = generatedTicketSerialIds;
		}); 

		it('Should fail due to missing ticket info', (done) =>
		{
			global.chai.request(global.app).post('/v1/admin/ticket/generate_serial').set('Authorization', `Bearer ${token}`).send({}).end((err, res) =>
			{
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});

	describe('POST /v1/admin/ticket/disabled_status', () =>
    {
		it('Should disable ticket serial successfully', (done) => {
			
			let _id = global.ticket_serial_info.newly_added_ticket_serial_ids[0];

			global.chai.request(global.app).post('/v1/admin/ticket/disabled_status').set('Authorization', `Bearer ${token}`).send({ _id }).end((err, res) => {
				global.expect(res).to.have.status(200);
				global.expect(res.body).to.have.property('status').equal('success');
				global.expect(res.body).to.have.property('status_code').equal(200);
				done();
			  });
		  });

		it('Should fail due to missing ticket serial', (done) =>
        {
			let _id;
            global.chai.request(global.app).post('/v1/admin/ticket/disabled_status').set('Authorization', `Bearer ${token}`).send({ _id }).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });

	describe('POST /v1/admin/ticket/enable_status', () =>
    {
        it('Should disable ticket serial successfully', (done) =>
        {
			let _id = global.ticket_serial_info.newly_added_ticket_serial_ids[0];

            global.chai.request(global.app).post('/v1/admin/ticket/enable_status').set('Authorization', `Bearer ${token}`).send({ _id}).end((err, res) =>
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

		it('Should fail due to missing ticket serial', (done) =>
        {
			let _id;
            global.chai.request(global.app).post('/v1/admin/ticket/enable_status').set('Authorization', `Bearer ${token}`).send({ _id }).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });
	
	describe('POST/v1/admin/ticket/change_status_bulk', () =>
    {
        it('Should edit bulk ticket serial successfully', (done) =>
        {
			const ticket_serial_list = [
				{
					_id: global.ticket_serial_info.newly_added_ticket_serial_ids[0],
				},
			];

			let new_status = 'used';
            
			global.chai.request(global.app).post('/v1/admin/ticket/change_status_bulk').set('Authorization', `Bearer ${token}`).send({ ticket_serial_list, new_status }).end((err, res) =>
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

		it('Should fail due to missing ticket serial', (done) =>
        {
			let _id;
            global.chai.request(global.app).post('/v1/admin/ticket/change_status_bulk').set('Authorization', `Bearer ${token}`).send({ _id}).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });

	describe('POST /v1/admin/ticket/reserved', () =>
    {
        it('Should Mark as Reserved successfully', (done) =>
        {
			const ticket_serial_list = [
				{
					_id: global.ticket_serial_info.newly_added_ticket_serial_ids[0],
				},
			];

			let purpose = 'for printing';
            
			global.chai.request(global.app).post('/v1/admin/ticket/reserved').set('Authorization', `Bearer ${token}`).send({ ticket_serial_list, purpose }).end((err, res) =>
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

		it('Should fail due to missing ticket serial', (done) =>
        {
			let _id;
            global.chai.request(global.app).post('/v1/admin/ticket/reserved').set('Authorization', `Bearer ${token}`).send({ _id}).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });

	describe('POST /v1/admin/ticket/unused', () =>
    {
        it('Should Mark as Unused successfully', (done) =>
        {
			const ticket_serial_list = [
				{
					_id: global.ticket_serial_info.newly_added_ticket_serial_ids[0],
				},
			];
            
			global.chai.request(global.app).post('/v1/admin/ticket/unused').set('Authorization', `Bearer ${token}`).send({ ticket_serial_list }).end((err, res) =>
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

		it('Should fail due to missing ticket serial', (done) =>
        {
			let _id;
            global.chai.request(global.app).post('/v1/admin/ticket/unused').set('Authorization', `Bearer ${token}`).send({ _id}).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });

	describe('POST /v1/admin/ticket/ecom', () =>
    {
        it('Should Place to Ecomm successfully', (done) =>
        {
			const ticket_serial_list = [
				{
					_id: global.ticket_serial_info.newly_added_ticket_serial_ids[0],
				},
			];
            let purpose;
			global.chai.request(global.app).post('/v1/admin/ticket/ecom').set('Authorization', `Bearer ${token}`).send({ ticket_serial_list, purpose }).end((err, res) =>
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

		it('Should fail due to missing ticket serial', (done) =>
        {
			let ticket_serial_list = [];
            global.chai.request(global.app).post('/v1/admin/ticket/ecom').set('Authorization', `Bearer ${token}`).send({ ticket_serial_list}).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });
});


/*

✔ Should Place to Ecomm successfully (3386ms)
Error occurred while updating ticket serials: TypeError: Cannot read 
properties of undefined (reading 'ticket_id')
    at markAsEcom (C:\Users\RIE JEL\Desktop\lyka\geer-blz-backend\controllers\admin\AdminTicketController.js:488:66)
*/