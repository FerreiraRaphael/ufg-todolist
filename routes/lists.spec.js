const request = require('supertest');
const expect = require('expect.js');
const app = require('../app');
const { login } = require('../test/helpers');
const models = require('../models');

const { User, List } = models;

describe('Route /list', () => {
  before(() => models.sequelize.sync());
  let user;
  let headers;
  beforeEach(async () => {
    await User.destroy({ where: {} });
    await List.destroy({ where: {} });
    const data = {
      username: 'teste',
      password: 'teste'
    };
    user = await User.create(data);
    const authResponse = await login(app, data);
    headers = {};
    headers.Accept = /application\/json/;
    headers.Authorization = `Bearer ${authResponse.body.token}`;
    headers.UserId = authResponse.body.user.id;
  });

  describe('GET /user/:userId/list', () => {
    let user2;
    beforeEach(async () => {
      const lists = ['list 1', 'list 2', 'list 3'];
      user2 = await User.create({ password: 'teste', username: 'teste 2' });
      lists.forEach(async title => {
        await List.create({ title, UserId: user.id });
        await List.create({ title, UserId: user2.id });
      });
    });
    it('fetchs the user lists', async () => {
      const res = await request(app)
        .get(`/api/user/${user.id}/list`)
        .set(headers)
        .send({ title: 'list test' })
        .expect(200);

      expect(res.body.length).to.be(3);
    });
  });

  describe('POST /user/:userId/list', () => {
    it('creates a list', async () => {
      await request(app)
        .post(`/api/user/${user.id}/list`)
        .set(headers)
        .send({ title: 'list test' })
        .expect(200);
      const count = (await user.getLists()).length;
      expect(count).to.be(1);
    });
  });

  describe('PUT /user/:userId/list/:ListId', () => {
    let list;
    beforeEach(async () => {
      list = await List.create({ title: 'teste', UserId: user.id });
    });
    it('updates a list', done => {
      const updateData = { title: 'teste 2' };
            request(app)
        .put(`/api/user/${user.id}/list/${list.id}`)
        .set(headers)
        .send(updateData)
        .expect(200)
        .end(async () => {
          await list.reload();
          expect(list.title).to.be(updateData.title);
          done();
        });
    });
  });

  describe('DELETE /user/:userId/list/:ListId', () => {
    let list;
    beforeEach(async () => {
      list = await List.create({ title: 'teste', UserId: user.id });
    });
    it('creates a list', async () => {
      await request(app)
        .delete(`/api/user/${user.id}/list/${list.id}`)
        .set(headers)
        .send()
        .expect(200);
      const count = (await user.getLists()).length;
      expect(count).to.be(0);
    });
  });
});
