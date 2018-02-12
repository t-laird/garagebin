process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);



describe('API routes', () => {
  beforeEach((done) => {
    knex.seed.run()
      .then(() => {
        done();
      });
  })
  describe('GET /api/v1/garage', () => {
    it ('Should get the expected garage items', () => {
      return chai.request(server)
        .get('/api/v1/garage')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.items.should.be.a('array');
          response.body.items.length.should.equal(3);
          response.body.items.every( item => {
            return (
              item.hasOwnProperty('name') &&
              item.hasOwnProperty('cleanliness') &&
              item.hasOwnProperty('reason') &&
              item.hasOwnProperty('id')
            )
          })
        })
        .catch(err => {
          throw err;
        })
    });
  });

  describe('POST /api/v1/garage', () => {
    it('should post successfully', () => {
      return chai.request(server)
      .post('/api/v1/garage')
      .send({
        name: 'Test',
        reason: 'Testing',
        cleanliness: 'Sparlking'
      })
      .then(response => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.status.should.equal('Success');
        response.body.id.should.be.a('number');
      })
      .catch(err => {
        throw err;
      })
    });

    it('should return a 422 when missing a parameter', () => {
      return chai.request(server)
      .post('/api/v1/garage')
      .send({
        name: 'Test',
        reason: 'Testing'
      })
      .then(() => {
      })
      .catch(err => {
        err.should.have.status(422);
        err.response.should.be.json;
        err.response.body.should.be.a('object');
        err.response.body.error.should.match(/You are missing the cleanliness field!/);
      })
    });
  });

  describe('PATCH /api/v1/garage/:id', () => {
    it('should patch the cleanliness field correctly', () => {
      
      return chai.request(server)
      .get('/api/v1/garage')
      .then(res => {
        return res.body.items[0].id;
      })
      .then(id => {
        return chai.request(server)
        .patch(`/api/v1/garage/${id}`)
        .send({
          cleanliness: 'Dusty'
        })
        .then(response => {
          response.should.have.status(202);
          response.should.be.json;
          response.body.status.should.equal('successfully updated cleanliness');
        })
        .catch(err => {
          throw err;
        });
      })
    });

    it('should fail to patch given an invalid id', () => {
      return chai.request(server)
        .patch('/api/v1/garage/123123123')
        .send({
          cleanliness: 'Dusty'
        })
        .then(() => {

        })
        .catch(err => {
          err.should.have.status(500);
          err.response.body.should.be.json;
          error.response.body.error.should.equal('failed to update cleanliness');
        });
    });

    it('should fail to patch given no cleanliness is passed', () => {
      return chai.request(server)
      .patch('/api/v1/garage/123')
      .then(() => {
      })
      .catch(err => {
        err.response.should.be.json;
        err.response.should.have.status(422);
        err.response.body.error.should.equal('Enter a valid cleanliness');
      });
    })
  });
});