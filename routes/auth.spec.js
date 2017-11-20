const request = require('supertest');
const expect = require('expect.js');
const http = require('http-status');
const Bluebird = require('bluebird');
const app = require('../app');
const models = require('../models');

const { User } = models;

describe('Route /auth', () => {
  before(() => models.sequelize.sync());
  let user;
  let headers;
  let data;
  beforeEach(async () => {
    await User.destroy({ where: {} });
    data = {
      username: 'teste',
      password: 'teste'
    };
    user = await User.create(data);
    headers = {};
    headers.Accept = /application\/json/;
  });

  describe('POST /auth', () => {
    it('authenticate user', async () => {
      const response = await request(app)
        .post(`/api/auth`)
        .set(headers)
        .send(data)
        .expect(http.OK);
      expect(response.body.token).to.be.ok();
      expect(response.body.user.id).to.be(user.id);
    });
  });

  // describe('DELETE /auth', () => {
  //   it.only('signout user', async () => {
  //     const authResponse = await request(app)
  //       .post(`/api/auth`)
  //       .set(headers)
  //       .send(data)
  //       .expect(200);
  //     headers.Authorization = `Bearer ${authResponse.body.token}`;
  //     headers.UserId = authResponse.body.user.id;
  //     await request(app)
  //       .delete(`/api/auth`)
  //       .set(headers)
  //       .send()
  //       .expect(http.OK);
  //     const creationResponse = await request(app)
  //       .post(`/api/user/${user.id}/list`)
  //       .set(headers)
  //       .send({ title: 'teste' })
  //       .expect(http.UNAUTHORIZED);

  //     expect(creationResponse.body.error).to.be.ok();
  //   });
  // });
});
