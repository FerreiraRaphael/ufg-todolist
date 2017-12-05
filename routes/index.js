const router = require('express').Router();
const userRoutes = require('./users');
const authRoutes = require('./auth');
const { authMiddlaware } = require('./middlawares');

router.get('/authetication', [
  ...authMiddlaware,
  (req, res) => res.json('auth')
]);

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
