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
  beforeEach(function() {
    return Bluebird.all([
      User.destroy({
        where: {}
      })
    ]);
  });

  describe("GET /user/:userId/list", () => {
    let user, user2, authResponse;
    beforeEach(async function createAndAuthUser() {
      const data = {
        username: "teste",
        password: "teste"
      };
      const lists = ["list 1", "list 2", "list 3"];
      user = await User.create(data);
      user2 = await User.create({ ...data, username: "teste 2" });
      authResponse = await login(app, data);
      lists.forEach(async title => {
        await List.create({ title, UserId: user.id });
        await List.create({ title, UserId: user2.id });
      });
    });
    it("fetchs the user lists", function (done) {
      request(app)
        .get(`/api/user/${user.id}/list`)
        .set("Accept", /application\/json/)
        .set("Authorization", `Bearer ${authResponse.body.token}`)
        .set("UserId", authResponse.body.user.id)
        .send({ title: "list test" })
        .expect(200)
        .end((err, res) => {
          expect(res.body.length).to.be(3);
          done()
        });
    });
  });

  describe("POST /user/:userId/list", () => {
    let user, authResponse;
    beforeEach(async function createAndAuthUser() {
      const data = {
        username: "teste",
        password: "teste"
      };
      user = await User.create(data);
      authResponse = await login(app, data);
    });
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

  //   describe("DELETE /user", () => {
  //     beforeEach(async function createAndAuthUser() {
  //       const data = {
  //         username: "teste",
  //         password: "teste"
  //       };
  //       this.user = await User.create(data);
  //       this.authResponse = await login(app, data);
  //     });
  //     it("deletes a autheticated user", async () => {
  //       await request(app)
  //         .delete(`/api/user/${this.user.id}`)
  //         .set("Accept", /application\/json/)
  //         .set("Authorization", `Bearer ${this.authResponse.body.token}`)
  //         .set("UserId", this.authResponse.body.user.id)
  //         .send()
  //         .expect(200);
  //       const count = await User.count();
  //       expect(count).to.be(0);
  //     });
  //   });
});
