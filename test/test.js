const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const server = require('../server');
chai.use(chaiHttp);

const expect = chai.expect;

describe('Login Test', () => {
    it('should return a 200 status code', (done) => {
        chai.request(server)
            .post('/api/users/login')
            .send({
                "email": "yahya@gmail.com",
                "password": "qwe123"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done()
            })
    })
})
