let user_id             = null;
let token               = null;
let item 				= null;

describe('Front Cart API', () =>
{
	describe('POST /v1/add_item', () =>
	{  
		before((done) => 
		{
			/* get user information as token */
			global.chai.request(global.app).post('/v1/login').send({ email: global.auth_credentials1.email, password: global.auth_credentials1.password }).end((err, res) =>
			{
				token 		= res.body.token;
				user_id 	= res.body._id;

				/* get information of first item */
				global.chai.request(global.app).get('/v1/front/item/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
				{
					item 	= res.body.table_data[0];
					done();
				});
			});
		});

		it('Should add an item to the cart when all required fields are provided', (done) => 
		{
			const new_item =
			{
				item_id: item._id,
				quantity: 2,
				is_checked: true,
			};

			global.chai.request(global.app).post('/v1/cart/add_item').set('Authorization', `Bearer ${token}`).send(new_item).end((err, res) =>
			{      
				console.log(res.body);
				global.expect(res).to.have.status(200);
				global.expect(res.body).to.have.property('status').equal('success');
				global.expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});

		it('Should fail due to missing item', (done) => 
		{
			const new_item = { item_id:``,quantity: 2, is_checked: true };

			global.chai.request(global.app).post('/v1/cart/add_item').set('Authorization', `Bearer ${token}`).send(new_item).end((err, res) =>
			{
				global.expect(err).to.be.null;
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				global.expect(res.body).to.have.property('message').equal("Item ID is required");
				done();
			});
		});
	});  
});  
