const router = require("express").Router();
const models = require("../models");
const userRoutes = require("./users");
const authRoutes = require("./auth");
const { authMiddlaware } = require("./middlawares");

router.get("/", function(req, res) {
  res.json({ hello: "world" });
});

router.get("/authetication", [
  ...authMiddlaware,
  (req, res) => res.json("auth")
]);

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
