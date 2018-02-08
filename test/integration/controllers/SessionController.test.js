// test/integration/controllers/UserController.test.js
var supertest = require('supertest');

describe('SessionController.login', function() {

  describe('#login()', function() {
    it('should redirect to /home', function (done) {
      supertest(sails.hooks.http.app)
      .post('/session/create')
      .send({ name: 'j', password: 'j' })
      .expect(302)
      .expect('location','/home', done);
    });
  });

});
