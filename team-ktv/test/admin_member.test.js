/* import libraries */
const chai                  = require('chai');
const chaiHttp              = require('chai-http');
const app                   = require('../index'); 
const system_config         = require('../system_config');
chai.use(chaiHttp);
const expect                = chai.expect;
system_config.hide_logs     = true;

/* start test cases */
describe('Member API', () =>
{
    describe('GET /v1/admin/member/get_list', () =>
    {
        it('Get Member List', (done) =>
        {
            chai.request(app).get('/v1/admin/member/get_list').send().end((err, res) =>
            {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').equal('success');
                expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });
    });

    describe('POST /v1/admin/member/save_user', () =>
    {
        // let _id                 = `64b8e201311f83bd0f7c0c67`;
        // let first_name          = `FN ${random_int}`; 
        // let middle_name         = `MN ${random_int}`; 
        // let last_name           = `LN ${random_int}`;
        // let contact_number      = `09171587078`;

        // it('Edit Member Info', (done) =>
        // {
        //     chai.request(app).post('/v1/admin/member/save_user').send({ _id, first_name, middle_name, last_name, contact_number }).end((err, res) =>
        //     {
        //         expect(res).to.have.status(200);
        //         expect(res.body).to.have.property('status').equal('success');
        //         expect(res.body).to.have.property('status_code').equal(200);
        //         done();
        //     });
        // });
    });
});