'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _expressFlash = require('express-flash');

var _expressFlash2 = _interopRequireDefault(_expressFlash);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _unsupportedMessage = require('../db/unsupportedMessage');

var _unsupportedMessage2 = _interopRequireDefault(_unsupportedMessage);

var _secrets = require('./secrets');

var _appConfig = require('./appConfig');

var _db = require('../db');

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.set('port', process.env.PORT || 3000);

  if (_appConfig.ENV === 'production') {
    app.use((0, _compression2.default)());
    // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
    app.use((0, _helmet2.default)());
  }

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use((0, _methodOverride2.default)());

  app.use(_express2.default.static(_path2.default.join(__dirname, '../..', 'public')));

  // I am adding this here so that the Heroku deploy will work
  // Indicates the app is behind a front-facing proxy,
  // and to use the X-Forwarded-* headers to determine the connection and the IP address of the client.
  // NOTE: X-Forwarded-* headers are easily spoofed and the detected IP addresses are unreliable.
  // trust proxy is disabled by default.
  // When enabled, Express attempts to determine the IP address of the client connected through the front-facing proxy, or series of proxies.
  // The req.ips property, then, contains an array of IP addresses the client is connected through.
  // To enable it, use the values described in the trust proxy options table.
  // The trust proxy setting is implemented using the proxy-addr package. For more information, see its documentation.
  // loopback - 127.0.0.1/8, ::1/128
  app.set('trust proxy', 'loopback');
  // Create a session middleware with the given options
  // Note session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
  // Options: resave: forces the session to be saved back to the session store, even if the session was never
  //                  modified during the request. Depending on your store this may be necessary, but it can also
  //                  create race conditions where a client has two parallel requests to your server and changes made
  //                  to the session in one request may get overwritten when the other request ends, even if it made no
  //                  changes(this behavior also depends on what store you're using).
  //          saveUnitialized: Forces a session that is uninitialized to be saved to the store. A session is uninitialized when
  //                  it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage
  //                  usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with
  //                  race conditions where a client makes multiple parallel requests without a session
  //          secret: This is the secret used to sign the session ID cookie.
  //          name: The name of the session ID cookie to set in the response (and read from in the request).
  //          cookie: Please note that secure: true is a recommended option.
  //                  However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies.
  //                  If secure is set, and you access your site over HTTP, the cookie will not be set.
  var sessionStore = null;
  if (!_db.session) {
    console.warn((0, _unsupportedMessage2.default)('session'));
  } else {
    sessionStore = (0, _db.session)();
  }

  var sess = {
    resave: false,
    saveUninitialized: false,
    secret: _secrets.sessionSecret,
    proxy: true, // The "X-Forwarded-Proto" header will be used.
    name: 'sessionId',
    // Add HTTPOnly, Secure attributes on Session Cookie
    // If secure is set, and you access your site over HTTP, the cookie will not be set
    cookie: {
      httpOnly: true,
      secure: false
    },
    store: sessionStore
  };

  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log('===>  Environment: ' + _appConfig.ENV);
  console.log('===>  Listening on port: ' + app.get('port'));
  console.log('===>  Using DB TYPE: ' + _appConfig.DB_TYPE);
  if (_appConfig.ENV === 'production') {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
    sess.cookie.secure = true; // Serve secure cookies
  }
  console.log('--------------------------');

  app.use((0, _expressSession2.default)(sess));

  app.use(_passport2.default.initialize());
  app.use(_passport2.default.session());

  app.use((0, _expressFlash2.default)());
};