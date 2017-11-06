"use strict";
const Bluebird = require("bluebird");
const request = require("supertest");
const expect = require("expect.js");
const app = require("../app");
const { login } = require("../test/helpers");
const models = require("../models");
const { User, List, Task } = models;

describe("Route /task", function() {
  before(function() {
    return models.sequelize.sync();
  });
  let user, list, authResponse;
  beforeEach(async function createAndAuthUser() {
    await User.destroy({ where: {} });
    const data = {
      username: "teste",
      password: "teste"
    };
    user = await User.create(data);
    authResponse = await login(app, data);
  });
  beforeEach(async function createUserList() {
    await List.destroy({ where: {} });
    await Task.destroy({ where: {} });
    
    list = await List.create({ UserId: user.id, title: "teste" });
  });

  describe("POST /user/:userId/list/:ListId/task", () => {
    it("creates a task", async () => {
      await request(app)
        .post(`/api/user/${user.id}/list/${list.id}/task`)
        .set("Accept", /application\/json/)
        .set("Authorization", `Bearer ${authResponse.body.token}`)
        .set("UserId", authResponse.body.user.id)
        .send({ title: "list test" })
        .expect(200);
      const count = (await list.getTasks()).length;
      expect(count).to.be(1);
    });
  });

  describe("PUT /user/:userId/list/:ListId/task/:TaskId", () => {
    let task;
    beforeEach(async function createTask() {
      task = await Task.create({ title: "teste", UserId: user.id, ListId: list.id });
    });
    it("updates a task", async () => {
      const updateData = { title: "teste 2" };
      await request(app)
        .put(`/api/user/${user.id}/list/${list.id}/task/${task.id}`)
        .set("Accept", /application\/json/)
        .set("Authorization", `Bearer ${authResponse.body.token}`)
        .set("UserId", authResponse.body.user.id)
        .send(updateData)
        .expect(200);
      await task.reload();
      expect(task.title).to.be(updateData.title);
    });
  });

  describe("DELETE /user/:userId/list/:ListId/task/:TaskId", () => {
    let task;
    beforeEach(async function createTask() {
      task = await Task.create({ title: "teste", UserId: user.id, ListId: list.id });
    });
    it("creates a task", async () => {
      await request(app)
        .delete(`/api/user/${user.id}/list/${list.id}/task/${task.id}`)
        .set("Accept", /application\/json/)
        .set("Authorization", `Bearer ${authResponse.body.token}`)
        .set("UserId", authResponse.body.user.id)
        .send()
        .expect(200);
      const count = (await list.getTasks()).length;
      expect(count).to.be(0);
    });
  });
});
