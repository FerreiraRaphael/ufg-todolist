const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const jwt = require('jsonwebtoken');

const routes = require('./routes/index');
const { User } = require('./models');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'client/build')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use('/api', routes);

app.get('/docs', (req, res) => {
  res.sendFile(path.join(`${__dirname}/docs/index.html`));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

passport.use(
  new BearerStrategy({ passReqToCallback: true }, async (req, token, done) => {
    const id = req.headers.userid;
    try {
      const { lastLogout } = await User.find({ where: { id } });
      const user = await jwt.verify(
        token,
        `${process.env.APP_SECRET ||
          'development'} ${id} ${lastLogout.getTime()}`
      );
      if (!user) {
        return done(null, { error: 'Não foi possível autenticar' });
      }
      return done(null, user);
    } catch (e) {
      return done(null, { error: e.message });
    }
  })
);

module.exports = app;
