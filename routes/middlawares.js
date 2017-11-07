const passport = require('passport');

const authMiddlaware = [
  passport.authenticate('bearer', { session: false }),
  (req, res, next) => {
    if (req.user && req.user.error) {
      res.json({ error: req.user.error });
    }
    next();
  },
];

function isCurrentUserMiddlaware(req, res, next) {
  if (req.user.id === Number(req.params.UserId)) {
    next();
  } else {
    res.status(400).json({ error: 'unathorized' });
  }
}

module.exports = {
  authMiddlaware,
  isCurrentUserMiddlaware,
};
