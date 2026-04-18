/* import libraries */
const chai                  = require('chai');
const chaiHttp              = require('chai-http');
const app                   = require('../index'); 
const system_config         = require('../system_config');
chai.use(chaiHttp);
const expect                = chai.expect;
system_config.hide_logs     = true;

/* start test cases */
describe('Admin API', () =>
{
    describe('GET /v1/admin/administrator/get_list', () =>
    {
        it('Get Administrator List', (done) =>
        {
            chai.request(app).get('/v1/admin/administrator/get_list').send().end((err, res) =>
            {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').equal('success');
                expect(res.body).to.have.property('status_code').equal(200);
                done();
            });
        });
    });
});