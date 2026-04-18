let user_id             = null;
let token               = null;

describe('Front Place order API', () =>
{
    describe('POST /v1/order/place_order', () =>
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

        it('Should place order succesfully', (done) => 
        {
            const order_data = 
            {
                items: [
                {
                    id: item._id,
                    item_count: 1,
                }],
                promo_code: '',
            };

            global.chai.request(global.app).post('/v1/order/place_order').set('Authorization', `Bearer ${token}`).send(order_data).end((err, res) =>
            {    
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
				
				var jsonData = JSON.parse(res.text);
				global.order_info.newly_added_order_id = jsonData.response_data._id;
				done();
            });
        });
    });  

	describe('POST /v1/order/update_payment', () =>
    {  
        it('Should update payment successfully', (done) => 
        {

            global.chai.request(global.app).post('/v1/order/update_payment').set('Authorization', `Bearer ${token}`).send({ _id: global.order_info.newly_added_order_id, payment_proof_image: global.order_info.payment_proof_image }).end((err, res) =>
            {    
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });
    }); 

});
