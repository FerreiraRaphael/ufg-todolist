const express = require("express");
const { User, List } = require("../models");
const listRoutes = require("./lists");
const {} = require("./index");
const { authMiddlaware, isCurrentUserMiddlaware } = require("./middlawares");
const router = express.Router();

router.route("/").post(async function createUser(req, res) {
  const user = await User.create(req.body);
  res.json(user);
});

router.route("/:UserId").delete([
  ...authMiddlaware,
  isCurrentUserMiddlaware,
  async function deleteUser(req, res) {
    const id = req.params.UserId;
    const result = await User.destroy({ where: { id } });
    res.json(result);
  }
]);

router.use("/:UserId/list", listRoutes);

module.exports = router;
