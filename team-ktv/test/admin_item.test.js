/* initialize variables */

let item_name                   = global.item_info.item_name; 
let item_description            = global.item_info.item_description; 
let item_price                	= global.item_info.item_price; 
let item_image           		= global.item_info.item_image; 

let admin_id                	= null;
let token                   	= null;

describe('Item API', () =>
{
	before((done) => 
	{
		global.chai.request(global.app).post('/v1/admin/login').send({ email: global.auth_credentials.email, password: global.auth_credentials.password }).end((err, res) =>
		{
			token 		= res.body.token;
			admin_id 	= res.body._id;

			global.chai.request(global.app).get('/v1/admin/ticket/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				ticket 	= res.body.table_data[0];
				done();
			});
		});
	});

	describe('POST /v1/admin/item/add', () =>
	{
		it('Should add item successful', (done) => 
        {
            const item_data = 
            {
				item_name, 
				item_description, 
				item_price, 
				item_image,
                tickets: [
                {
                    id: ticket._id,
                    count: 1,
                }],
            };
            global.chai.request(global.app).post('/v1/admin/item/add').set('Authorization', `Bearer ${token}`).send(item_data).end((err, res) =>
            {    
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                
				var jsonData = JSON.parse(res.text);
				global.item_info.newly_added_item_id = jsonData.response_data._id;
				done();
            });
        });

		it('Should fail due to missing ticket info', (done) =>
		{
			let item_data;
			global.chai.request(global.app).post('/v1/admin/item/add').set('Authorization', `Bearer ${token}`).send(item_data).end((err, res) =>
			{
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});

	describe('GET /v1/admin/item/get_list', () =>
	{
		it('Should Get ticket List successfully', (done) =>
		{
			global.chai.request(app).get('/v1/admin/item/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

	describe('GET /v1/admin/item/get_lis/archived', () =>
	{
		it('Should Get archived ticket List successfully', (done) =>
		{
			global.chai.request(app).get('/v1/admin/item/get_list/archived').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

	describe('POST /v1/admin/item/edit', () =>
	{
		it('Should edit item successful', (done) => 
        {
            const item_data = 
            {
				_id: global.item_info.newly_added_item_id,
				item_name: 'edited item name', 
				item_description, 
				item_price, 
				item_image,
                tickets: [
                {
                    id: ticket._id,
                    count: 1,
                }],
            };
            global.chai.request(global.app).post('/v1/admin/item/edit').set('Authorization', `Bearer ${token}`).send(item_data).end((err, res) =>
            {    
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

		it('Should fail due to missing item info', (done) =>
		{
			let item_data;
			global.chai.request(global.app).post('/v1/admin/item/edit').set('Authorization', `Bearer ${token}`).send(item_data).end((err, res) =>
			{
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});

	describe('POST /v1/admin/item/archive', () =>
	{
		it('Should archive item successful', (done) => 
        {
            global.chai.request(global.app).post('/v1/admin/item/archive').set('Authorization', `Bearer ${token}`).send({ _id: global.item_info.newly_added_item_id }).end((err, res) =>
            {    
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

		it('Should fail due to missing item info', (done) =>
		{
			let _id;
			global.chai.request(global.app).post('/v1/admin/item/archive').set('Authorization', `Bearer ${token}`).send(_id).end((err, res) =>
			{
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});

	describe('POST /v1/admin/item/restore', () =>
    {
        it('Should Restore Item successfully', (done) =>
        {
            global.chai.request(global.app).post('/v1/admin/item/restore').set('Authorization', `Bearer ${token}`).send({ _id: global.item_info.newly_added_item_id }).end((err, res) =>
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
            global.chai.request(global.app).post('/v1/admin/item/restore').set('Authorization', `Bearer ${token}`).send({ _id}).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });
});

	