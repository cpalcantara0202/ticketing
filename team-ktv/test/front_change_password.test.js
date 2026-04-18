/* initialize variables */
let user_id             = null;
let token               = null;
let email               = global.auth_credentials1.email;
let password            = global.auth_credentials1.password;

describe('Front Changepasswowrd API', () => 
{
    describe('POST /v1/change_password', () =>
    {
		before((done) => 
		{
			global.chai.request(global.app).post('/v1/login').send({ email: global.auth_credentials1.email, password: global.auth_credentials1.password }).end((err, res) =>
			{
				token 		= res.body.token;
				user_id 	= res.body._id;
				done();
			});
		});

		it('Should change password succesfully', (done) => 
		{
			const currentPassword 	= global.auth_credentials1.password;
			const newPassword 		= 'new_password123';
			const confirm_password 	= 'new_password123';

			global.chai.request(global.app).post('/v1/change_password').set('Authorization', `Bearer ${token}`).send({ currentPassword, newPassword, confirm_password }).end((err, res) =>
			{
				global.expect(res).to.have.status(200); 
				global.expect(res.body).to.have.property('status').equal('success');
				global.expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});

		it('Should change password again succesfully', (done) => 
		{
			const currentPassword 	= 'new_password123';
			const newPassword 		= global.auth_credentials1.password;
			const confirm_password 	= global.auth_credentials1.password;

			global.chai.request(global.app).post('/v1/change_password').set('Authorization', `Bearer ${token}`).send({ currentPassword, newPassword, confirm_password }).end((err, res) =>
			{
				global.expect(res).to.have.status(200); 
				global.expect(res.body).to.have.property('status').equal('success');
				global.expect(res.body).to.have.property('status_code').equal(200);
				done();
			});
		});

		it('Should fail to change password with passwords not matching', (done) => 
		{
			const currentPassword 	= 'water123';
			const newPassword 		= 'new_password123';
			const confirm_password 	= 'not_matching_password';

			global.chai.request(global.app).post('/v1/change_password').set('Authorization', `Bearer ${token}`).send({ currentPassword, newPassword, confirm_password }).end((err, res) =>
			{
				global.expect(err).to.be.null;
				global.expect(res).to.have.status(400);
				global.expect(res.body).to.have.property('status').equal('error');
				global.expect(res.body).to.have.property('status_code').equal(400);
				global.expect(res.body).to.have.property('message').equal("The password and confirm password didn't match.");
				done();
			});
		});
	});
});