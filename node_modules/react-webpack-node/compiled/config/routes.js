'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _unsupportedMessage = require('../db/unsupportedMessage');

var _unsupportedMessage2 = _interopRequireDefault(_unsupportedMessage);

var _db = require('../db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersController = _db.controllers && _db.controllers.users; /**
                                                                 * Routes for express app
                                                                 */

var topicsController = _db.controllers && _db.controllers.topics;

exports.default = function (app) {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn((0, _unsupportedMessage2.default)('users routes'));
  }

  if (_db.passport && _db.passport.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', _passport2.default.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback', _passport2.default.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));
  }

  // topic routes
  if (topicsController) {
    app.get('/topic', topicsController.all);
    app.post('/topic/:id', topicsController.add);
    app.put('/topic/:id', topicsController.update);
    app.delete('/topic/:id', topicsController.remove);
  } else {
    console.warn((0, _unsupportedMessage2.default)('topics routes'));
  }
};