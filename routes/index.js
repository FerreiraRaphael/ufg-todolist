const router = require('express').Router();
const path = require('path');
const userRoutes = require('./users');
const authRoutes = require('./auth');
const { authMiddlaware } = require('./middlawares');

// router.get('/', (req, res) => {
//   res.json({ hello: 'world' });
// });

router.get('/authetication', [
  ...authMiddlaware,
  (req, res) => res.json('auth')
]);

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

router.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname  }/client/build/index.html`));
});

module.exports = router;
