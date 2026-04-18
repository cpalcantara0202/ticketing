/* initialize variables */
let first_name          = global.auth_credentials.first_name; 
let middle_name         = global.auth_credentials.middle_name; 
let last_name           = global.auth_credentials.last_name;
let email               = global.auth_credentials.email;
let password            = global.auth_credentials.password;
let confirm_password    = global.auth_credentials.password;
let username            = global.auth_credentials.username;
let contact_number      = global.auth_credentials.contact_number;

/* start test cases */
describe('Admin Registration API', () =>
{
    describe('POST /v1/admin/register', () =>
    {
        it('Should register succesfully', (done) =>
        {
            global.chai.request(global.app).post('/v1/admin/register').send({ first_name, middle_name, last_name, email, password, confirm_password, username, contact_number }).end((err, res) =>
            {
                global.expect(res).to.have.status(200);
                global.expect(res.body).to.have.property('status').equal('success');
                global.expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });

        it('Should fail due to duplicate email', (done) =>
        {
            global.chai.request(global.app).post('/v1/admin/register').send({ first_name, middle_name, last_name, email, password, confirm_password, username, contact_number }).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                global.expect(res.body).to.have.property('message').equal('The email you entered already exist');
                done();
            });
        });

        it('Should fail due to mismatched password', (done) =>
        {
            confirm_password    = "wrong";
            email               = email.replace("unit_test", "unit_test_password");
            
            global.chai.request(global.app).post('/v1/admin/register').send({ first_name, middle_name, last_name, email, password, confirm_password, username, contact_number }).end((err, res) =>
            {
                global.expect(res).to.have.status(400);
                global.expect(res.body).to.have.property('status').equal('error');
                global.expect(res.body).to.have.property('status_code').equal(400);
                global.expect(res.body).to.have.property('message').equal("The password and confirm password didn't match.");
                done();
            });
        });
    });
});