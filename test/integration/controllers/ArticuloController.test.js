// test/integration/controllers/UserController.test.js
var supertest = require('supertest');

describe('ArticuloController', function() {

  describe('/articulo/new should not be reachable if not authenticated', function() {
    it('should redirect to /session/new', function (done) {
      supertest(sails.hooks.http.app)
      .get('/articulo/new')
      //.send({ name: 'j', password: 'j' })
      .expect(302)
      .expect('location','/session/new', done);
    });
  });

  describe('/articulo/new should be reachable if authenticated', function() {
    it('should redirect to /articulo/new', function (done) {
      let agent = supertest(sails.hooks.http.app);
      agent
      .post('/session/create')
      .send({ name: 'j', password: 'j' })
      .expect(302)
      .end(function(err,res,body){
        if (err) return done(err);
          agent
          .get('/articulo/new')
          .set('Cookie', res.headers['set-cookie'])
          .expect(200, done);
      });
    });
  });

});
