"use strict";
const Bluebird = require("bluebird");
const request = require("supertest");
const expect = require("expect.js");
const app = require("../app");
const { login } = require("../test/helpers");
const models = require("../models");
const { User, List } = models;

describe("Route /list", function() {
  before(function() {
    return models.sequelize.sync();
  });
  let user, authResponse;
  beforeEach(async function createAndAuthUser() {
    await User.destroy({ where: {} });
    await List.destroy({ where: {} });
    const data = {
      username: "teste",
      password: "teste"
    };
    user = await User.create(data);
    authResponse = await login(app, data);
  });

  describe("GET /user/:userId/list", () => {
    let user2;
    beforeEach(async function createListsForTwoUsers() {
      const lists = ["list 1", "list 2", "list 3"];
      user2 = await User.create({ password: "teste", username: "teste 2" });
      lists.forEach(async title => {
        await List.create({ title, UserId: user.id });
        await List.create({ title, UserId: user2.id });
      });
    });
    it("fetchs the user lists", function(done) {
      request(app)
        .get(`/api/user/${user.id}/list`)
        .set("Accept", /application\/json/)
        .set("Authorization", `Bearer ${authResponse.body.token}`)
        .set("UserId", authResponse.body.user.id)
        .send({ title: "list test" })
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).to.be(3);
          done();
        });
    });
  });

  describe("POST /user/:userId/list", () => {
    it("creates a list", async () => {
      await request(app)
        .post(`/api/user/${user.id}/list`)
        .set("Accept", /application\/json/)
        .set("Authorization", `Bearer ${authResponse.body.token}`)
        .set("UserId", authResponse.body.user.id)
        .send({ title: "list test" })
        .expect(200);
      const count = (await user.getLists()).length;
      expect(count).to.be(1);
    });
  });

  describe("PUT /user/:userId/list/:ListId", () => {
    let list;
    beforeEach(async function createList() {
      list = await List.create({title: "teste", UserId: user.id});
    });
    it("updates a list", async () => {
      const updateData = { title: "teste 2"};
      await request(app)
        .put(`/api/user/${user.id}/list/${list.id}`)
        .set("Accept", /application\/json/)
        .set("Authorization", `Bearer ${authResponse.body.token}`)
        .set("UserId", authResponse.body.user.id)
        .send(updateData)
        .expect(200);
      const updatedList = await List.find({where: {id: list.id}});
      expect(updateData.title).to.be(updateData.title);
    });
  });

  describe("DELETE /user/:userId/list/:ListId", () => {
    let list;
    beforeEach(async function createList() {
      list = await List.create({title: "teste", UserId: user.id});
    });
    it("creates a list", async () => {
      await request(app)
        .delete(`/api/user/${user.id}/list/${list.id}`)
        .set("Accept", /application\/json/)
        .set("Authorization", `Bearer ${authResponse.body.token}`)
        .set("UserId", authResponse.body.user.id)
        .send()
        .expect(200);
      const count = (await user.getLists()).length;
      expect(count).to.be(0);
    });
  });
});
