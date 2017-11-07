const Bluebird = require('bluebird');
const request = require('supertest');

function login(app, data) {
  return new Bluebird((resolve, reject) => {
    request(app)
      .post('/api/auth')
      .send(data)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
}

module.exports = { login };
