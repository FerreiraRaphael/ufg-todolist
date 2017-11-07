const request = require('supertest');
const expect = require('expect.js');
const app = require('../app');
const { login } = require('../test/helpers');
const models = require('../models');

const { User, List, Task } = models;

describe('Route /task', () => {
  before(() => models.sequelize.sync());
  let user;
  let list;
  let headers;
  beforeEach(async () => {
    await User.destroy({ where: {} });
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
  beforeEach(async () => {
    await List.destroy({ where: {} });
    await Task.destroy({ where: {} });

    list = await List.create({ UserId: user.id, title: 'teste' });
  });

  describe('POST /user/:userId/list/:ListId/task', () => {
    it('creates a task', async () => {
      await request(app)
        .post(`/api/user/${user.id}/list/${list.id}/task`)
        .set(headers)
        .send({ title: 'list test' })
        .expect(200);
      const count = (await list.getTasks()).length;
      expect(count).to.be(1);
    });
  });
  function createTask() {
    return Task.create({
      title: 'teste',
      UserId: user.id,
      ListId: list.id
    });
  }
  describe('PUT /user/:userId/list/:ListId/task/:TaskId', () => {
    let task;
    beforeEach(async () => {
      task = await createTask();
    });
    it('updates a task', async () => {
      const updateData = { title: 'teste 2' };
      await request(app)
        .put(`/api/user/${user.id}/list/${list.id}/task/${task.id}`)
        .set(headers)
        .send(updateData)
        .expect(200);
      await task.reload();
      expect(task.title).to.be(updateData.title);
    });
  });

  describe('DELETE /user/:userId/list/:ListId/task/:TaskId', () => {
    let task;
    beforeEach(async () => {
      task = await createTask();
    });
    it('creates a task', async () => {
      await request(app)
        .delete(`/api/user/${user.id}/list/${list.id}/task/${task.id}`)
        .set(headers)
        .send()
        .expect(200);
      const count = (await list.getTasks()).length;
      expect(count).to.be(0);
    });
  });
});
