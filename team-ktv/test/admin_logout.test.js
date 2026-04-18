/* initialize variables */
let email               = global.auth_credentials.email;
let password            = global.auth_credentials.password;

/* start test cases */
describe('Admin Logout API', () =>
{
    describe('POST /v1/admin/logout', () =>
    {
        it('Should logout succesfully', (done) =>
        {
            global.chai.request(global.app).post('/v1/admin/logout').send({ email, password }).end((err, res) =>
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });    
		
        it('Should fail due to invalid password', (done) =>
        {
            const password = "wrong_password";

            global.chai.request(global.app).post('/v1/admin/logout').send({ email, password }).end((err, res) =>
            {
              global.expect(res).to.have.status(400);
              global.expect(res.body).to.have.property('status').equal('error');
              global.expect(res.body).to.have.property('status_code').equal(400);
              global.expect(res.body).to.have.property('message').equal('Invalid Username/Email');
              done();
            });
        });    

    }); 
});
