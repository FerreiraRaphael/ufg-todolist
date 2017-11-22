const passport = require('passport');

/**
 * Verify if user is authenticated.
 * @function verifyAuthentication
 * @param  {User} req.user Authenticated user
 * @param  {Error} res.user.error Authentication error
 * @return {JSON} Next function or authentication error
 */
function verifyAuthentication(req, res, next) {
  if (req.user && req.user.error) {
    res.status(400).json({ error: req.user.error });
  }
  next();
}

/**
 * Verify if the userId param is the same as the user authenticated id.
 * @function isCurrentUserMiddlaware
 * @param  {User} req.user Authenticated user
 * @param  {String} req.params.UserId User Id Url param
 * @return {JSON} Next function or error unathorized
 */
function isCurrentUserMiddlaware(req, res, next) {
  if (req.user.id === Number(req.params.UserId)) {
    next();
  } else {
    res.status(400).json({ error: 'unathorized' });
  }
}

const authMiddlaware = [
  passport.authenticate('bearer', { session: false }),
  verifyAuthentication
];

module.exports = {
  authMiddlaware,
  isCurrentUserMiddlaware
};
