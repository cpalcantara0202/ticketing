/* initialize variables */

let user_id             = null;
let token               = null;

describe('Admin Order API', () =>
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

	describe('GET /v1/admin/order/get_list', () =>
	{
		it('Should Get Order List successfully', (done) =>
		{
			global.chai.request(app).get('/v1/admin/order/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

	describe('GET /v1/admin/order/view_payment?_id', () =>
	{
		it('Should Get Order List successfully', (done) =>
		{
			global.chai.request(app).get(`/v1/admin/order/view_payment?_id:${global.order_info.newly_added_order_id}`).set('Authorization', `Bearer ${token}`).send().end((err, res) =>
			{
				expect(res).to.have.status(200);
				expect(res.body).to.have.property('status').equal('success');
				expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});
	});

    describe('POST /v1/admin/order/approve_payment', () =>
    {  
    
        it('Should Approve order succesfully', (done) => 
        {
			let remarks = 'Approve By admin';
			
            global.chai.request(global.app).post('/v1/admin/order/approve_payment').set('Authorization', `Bearer ${token}`).send({ _id: global.order_info.newly_added_order_id, remarks, referencenumber: global.order_info.referencenumber }).end((err, res) =>
            {    
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);

				done();
            });
        });

    	it('Should fail due to missing order info', (done) => 
    	{
			let remarks = 'Approve By admin';
			let _id = '';

    	    global.chai.request(global.app).post('/v1/admin/order/approve_payment').set('Authorization', `Bearer ${token}`).send({ _id, remarks, referencenumber: global.order_info.referencenumber }).end((err, res) =>
    	    {    
    	        global.expect(res).to.have.status(400);
    	        global.expect(res.body).to.have.property('status').equal('error');
    	        global.expect(res.body).to.have.property('status_code').equal(400);

				done();
    	    });
    	});

    	it('Should fail due to repeated referencenumber', (done) => 
    	{
		let remarks = 'Approve By admin';

    	    global.chai.request(global.app).post('/v1/admin/order/approve_payment').set('Authorization', `Bearer ${token}`).send({ _id:global.order_info.newly_added_order_id, remarks, referencenumber: global.order_info.referencenumber }).end((err, res) =>
    	    {    
    	        global.expect(res).to.have.status(400);
    	        global.expect(res.body).to.have.property('status').equal('error');
    	        global.expect(res.body).to.have.property('status_code').equal(400);

			done();
    	    });
    	});
	});  
    
	describe('POST /v1/admin/order/reject_payment', () =>
    {  
    
        it('Should reject the payment successfully', (done) => 
        {
			let remarks = 'Reject By admin';

            global.chai.request(global.app).post('/v1/admin/order/reject_payment').set('Authorization', `Bearer ${token}`).send({ _id:global.order_info.newly_added_order_id, remarks}).end((err, res) =>
            {    
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);

				done();
            });
        });
    });  

});
