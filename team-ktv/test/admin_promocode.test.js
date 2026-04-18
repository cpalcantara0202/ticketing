const confirmPassword = require("../validators/confirmPassword");

/* initialize variables */
let first_name          = global.promo_code_info.first_name; 
let middle_name         = global.promo_code_info.middle_name; 
let last_name           = global.promo_code_info.last_name;
let screen_name			= global.promo_code_info.screen_name;
let email               = global.promo_code_info.email;
let promo_code 			= global.promo_code_info.promo_code;
let contact_number      = global.promo_code_info.contact_number;

let admin_id            = null;
let token             	= null;
let item 				= null;


describe('Admin Promo code API', () =>
{
	before((done) => 
	{
		global.chai.request(global.app).post('/v1/admin/login').send({ email: global.auth_credentials.email, password: global.auth_credentials.password }).end((err, res) =>
		{
			token 		= res.body.token;
			admin_id 	= res.body._id;

			/* get information of first item */
			global.chai.request(global.app).get('/v1/admin/item/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				item 	= res.body.table_data[0];
				done();
			});
		});
	});

	describe('POST /v1/admin/promo_code/add', () =>
	{
		it('Should add promocode successfuly', (done) => 
        {

            global.chai.request(global.app).post('/v1/admin/promo_code/add').set('Authorization', `Bearer ${token}`).send({ first_name, middle_name, last_name, screen_name, contact_number, email, promo_code }).end((err, res) =>
            {    
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                
				var jsonData = JSON.parse(res.text);
				global.promo_code_info.newly_added_promocode_id = jsonData.response_data._id;
				done();
            });
        });

		it('Should fail due to missing promo code info', (done) =>
		{
			
			let promo_code;
			global.chai.request(global.app).post('/v1/admin/promo_code/add').set('Authorization', `Bearer ${token}`).send({ first_name, middle_name, last_name, screen_name, contact_number, email, promo_code }).end((err, res) =>
            {
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});

	describe('POST /v1/admin/promo_code/edit', () =>
	{
		it('Should edit promocode successfuly', (done) => 
        {
			let promo_code = `MICO`;
            global.chai.request(global.app).post('/v1/admin/promo_code/edit').set('Authorization', `Bearer ${token}`).send({_id: global.promo_code_info.newly_added_promocode_id, first_name, middle_name, last_name, screen_name, contact_number, email, promo_code }).end((err, res) =>
            {    
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
				done();
            });
        });

		it('Should fail due to missing promo code info', (done) =>
		{
			
			let promo_code;
			global.chai.request(global.app).post('/v1/admin/promo_code/edit').set('Authorization', `Bearer ${token}`).send({_id: global.promo_code_info.newly_added_promocode_id, first_name, middle_name, last_name, screen_name, contact_number, email, promo_code }).end((err, res) =>
            {
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});

	describe('POST /v1/admin/promo_code/tag_item', () =>
	{
		it('Should tag an item successfuly', (done) => 
        {
			const order_data = 
            {
				_id: global.promo_code_info.newly_added_promocode_id,
                items: [
                {
					id: item._id,
					discount: `100`,
					commission: `100`,
                }],
            };
		   	global.chai.request(global.app).post('/v1/admin/promo_code/tag_item').set('Authorization', `Bearer ${token}`).send(order_data).end((err, res) =>
            {    
				console.log(res.body);
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
				done();
            });
        });

		it('Should fail due to missing item info', (done) =>
		{
			const order_data = 
            {
				_id: global.promo_code_info.newly_added_promocode_id,
                items: [
                {
					discount: `100`,
					commission: `100`,
                }],
            };
			global.chai.request(global.app).post('/v1/admin/promo_code/tag_item').set('Authorization', `Bearer ${token}`).send(order_data).end((err, res) =>
            {
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});


	describe('GET /v1/admin/promo_code/get_list', () =>
	{
		it('Should Get Promo code List successfully', (done) =>
		{
			global.chai.request(app).get('/v1/admin/promo_code/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

	describe('GET /v1/admin/promo_code_commission/get_list', () =>
	{
		it('Should Get Promo code commission List successfully', (done) =>
		{
			global.chai.request(app).get('/v1/admin/promo_code_commission/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

	describe('GET /v1/admin/promo_code/:promocode_id', () =>
	{
		it('Should Get promo code info successfully', (done) =>
		{
			global.chai.request(app).get(`/v1/admin/promo_code/${global.promo_code_info.newly_added_promocode_id}`).set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

});