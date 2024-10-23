const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server.js'); // Using require

describe('API Routes', () => {
  it('should register a new user', (done) => {
    request(app)
      .post('/api/register')
      .send({ username: 'testuser', password: 'password123' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('username', 'testuser');
        done();
      });
  });

  it('should send a chat message', (done) => {
    request(app)
      .post('/api/send-message')
      .send({ channelId: 'general', username: 'testuser', message: 'Hello!' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.equal('Message sent and saved.');
        done();
      });
  });
});
