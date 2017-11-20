const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { authMiddlaware } = require('./middlawares');

const router = express.Router();

router
  .route('/')
  .post(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.find({ where: { username } });
    if (!user) res.json('username or password incorrect');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) res.json('username or password incorrect');
    const token = await jwt.sign(
      user.dataValues,
      `${process.env.APP_SECRET || 'development'} ${user.lastLogout.getTime()}`
    );
    res.json({ token, user });
  })
  .delete([...authMiddlaware, async (req, res) => {
    const { id } = req.user;
    await User.update({ lastLogout: new Date() }, { where: { id } });
    res.json('Logout');
  }]);

module.exports = router;
