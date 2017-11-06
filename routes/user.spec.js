"use strict";
const Bluebird = require("bluebird");
const request = require("supertest");
const expect = require("expect.js");
const app = require("../app");
const { login } = require("../test/helpers");
const models = require("../models");
const { User } = models;

describe("Route /user", function() {
  before(function() {
    return models.sequelize.sync();
  });
  beforeEach(function() {
    return Bluebird.all([
      User.destroy({
        where: {},
        truncate: true
      })
    ]);
  });

  describe("POST /user", () => {
    it("creates a user", async () => {
      await request(app)
        .post("/api/user")
        .set("Accept", /application\/json/)
        .send({ username: "johndoe", password: "123456" })
        .expect(200);
      const count = await User.count();
      expect(count).to.be(1);
    });
  });

  describe("DELETE /user", () => {
    let user, authResponse;
    beforeEach(async function createAndAuthUser() {
      const data = {
        username: "teste",
        password: "teste"
      };
      user = await User.create(data);
      authResponse = await login(app, data);
    });
    it("deletes a autheticated user", async () => {
      await request(app)
        .delete(`/api/user/${user.id}`)
        .set("Accept", /application\/json/)
        .set("Authorization", `Bearer ${authResponse.body.token}`)
        .set("UserId", authResponse.body.user.id)
        .send()
        .expect(200);
      const count = await User.count();
      expect(count).to.be(0);
    });
  });
});
