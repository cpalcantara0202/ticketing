/* initialize variables */
let event_name              = global.event_info.event_name; 
let event_date_start        = global.event_info.event_date_start; 
let event_date_end          = global.event_info.event_date_end; 
let event_location          = global.event_info.event_location; 
let event_cover             = global.event_info.event_cover; 
let event_description       = global.event_info.event_description; 
let event_map               = global.event_info.event_map;

/* initialize variables */
let admin_id             = null;
let token               = null;

describe('Event API', () =>
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
    describe('GET /v1/admin/event/get_list', () =>
    {
        it('Should Event List successfully', (done) =>
        {
           // global.chai.request(global.app).get('/v1/admin/event/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
            global.chai.request(global.app).get('/v1/admin/event/get_list').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
            {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').equal('success');
                expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });
    });

    describe('GET /v1/admin/event/get_list/archived', () =>
    {
        it('Should Event Archived List successfully', (done) =>
        {
            global.chai.request(global.app).get('/v1/admin/event/get_list/archived').set('Authorization', `Bearer ${token}`).send().end((err, res) =>
            {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').equal('success');
                expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });
    });

    describe('POST /v1/admin/event/add', () =>
    {
        it('Should Add Event successfully', (done) => 
        {
            global.chai.request(global.app).post('/v1/admin/event/add').set('Authorization', `Bearer ${token}`).send({ event_name, event_date_start, event_date_end, event_location, event_cover, event_description, event_map }).end((err, res) => 
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200); 
    
                var jsonData = JSON.parse(res.text);
                global.event_info.newly_added_event_id = jsonData.response_data._id;
                done();
            });
        }); 

		it('Should fail due to missing event info', (done) =>
		{
			let event_name;
			global.chai.request(global.app).post('/v1/admin/event/add').set('Authorization', `Bearer ${token}`).send({ event_name, event_date_start, event_date_end, event_location, event_cover, event_description, event_map }).end((err, res) => 
            {
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
    });
	describe('POST /v1/admin/event/edit', () =>
	{
		it('Should edit event successfully', (done) =>
		{
			let event_name = `edited event name`;
			global.chai.request(global.app).post('/v1/admin/event/edit').set('Authorization', `Bearer ${token}`).send({_id: global.event_info.newly_added_event_id, event_name, event_date_start, event_date_end, event_location, event_cover, event_description, event_map }).end((err, res) => 
            {
				global.expect(res).to.have.status(200);
				global.expect(res.body).to.have.property('status').equal('success');
				global.expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});

		it('Should fail due to missing event info', (done) =>
		{
			let event_name;
			global.chai.request(global.app).post('/v1/admin/event/edit').set('Authorization', `Bearer ${token}`).send({_id: global.event_info.newly_added_event_id,  event_name, event_date_start, event_date_end, event_location, event_cover, event_description, event_map }).end((err, res) => 
            {
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				done();
			});
		});
	});

    describe('POST /v1/admin/event/archive', () =>
    {
        it('Should Archive Event successfully', (done) =>
        {
            global.chai.request(global.app).post('/v1/admin/event/archive').set('Authorization', `Bearer ${token}`).send({ _id: global.event_info.newly_added_event_id }).end((err, res) =>
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
            global.chai.request(global.app).post('/v1/admin/event/archive').set('Authorization', `Bearer ${token}`).send({ _id}).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });

	describe('POST /v1/admin/event/restore', () =>
    {
        it('Should Restore Event successfully', (done) =>
        {
            global.chai.request(global.app).post('/v1/admin/event/restore').set('Authorization', `Bearer ${token}`).send({ _id: global.event_info.newly_added_event_id }).end((err, res) =>
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
            global.chai.request(global.app).post('/v1/admin/event/restore').set('Authorization', `Bearer ${token}`).send({ _id}).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                done();
            });
        });
    });
});