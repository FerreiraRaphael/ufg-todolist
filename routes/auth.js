const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { authMiddlaware } = require('./middlawares');
const { ApiError } = require('../lib/helpers');

const router = express.Router();

router
  .route('/')
  .post(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.find({ where: { username } });
    if (!user)
      res
        .status(400)
        .json(
          ApiError([
            {
              message: 'username or password incorrect',
              path: 'username',
              type: 'invalid login'
            }
          ])
        );
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      res
        .status(400)
        .json(
          ApiError([
            {
              message: 'username or password incorrect',
              path: 'username',
              type: 'invalid login'
            }
          ])
        );
    const token = await jwt.sign(
      user.dataValues,
      `${process.env.APP_SECRET || 'development'} ${user.id} ${user.lastLogout.getTime()}`
    );
    res.status(200).json({ token, user });
  })
  .delete([
    ...authMiddlaware,
    async (req, res) => {
      const { id } = req.user;
      await User.update({ lastLogout: new Date() }, { where: { id } });
      res.json('Logout');
    }
  ]);

module.exports = router;
