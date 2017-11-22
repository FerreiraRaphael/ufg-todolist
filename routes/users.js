const express = require('express');
const { User } = require('../models');
const listRoutes = require('./lists');
const { authMiddlaware, isCurrentUserMiddlaware } = require('./middlawares');

const router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.route('/me').get([
  ...authMiddlaware,
  (req, res) => {
    res.status(200).json(req.user);
  }
]);

router.route('/:UserId').delete([
  ...authMiddlaware,
  isCurrentUserMiddlaware,
  async function deleteUser(req, res) {
    const id = req.params.UserId;
    const result = await User.destroy({ where: { id } });
    res.json(result);
  }
]);

router.use('/:UserId/list', listRoutes);

module.exports = router;
