const passport = require('passport');
const http = require('http-status');

/**
 * Verify if user is authenticated.
 * @function verifyAuthentication
 * @param  {User} req.user Authenticated user
 * @param  {Error} res.user.error Authentication error
 * @return {JSON} Next function or authentication error
 */
function verifyAuthentication(req, res, next) {
  debugger;
  if (req.user && req.user.error) {
    res.status(http.UNAUTHORIZED).json({ error: req.user.error });
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
    res.status(http.UNAUTHORIZED).json({ error: 'unathorized' });
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
