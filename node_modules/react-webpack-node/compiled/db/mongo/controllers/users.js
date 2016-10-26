'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.logout = logout;
exports.signUp = signUp;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * POST /login
 */
function login(req, res, next) {
  // Do email and password validation for the server
  _passport2.default.authenticate('local', function (authErr, user, info) {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, function (loginErr) {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        message: 'You have been successfully logged in.'
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
function logout(req, res) {
  // Do email and password validation for the server
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
function signUp(req, res, next) {
  var user = new _user2.default({
    email: req.body.email,
    password: req.body.password
  });

  _user2.default.findOne({ email: req.body.email }, function (findErr, existingUser) {
    if (existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists!' });
    }

    return user.save(function (saveErr) {
      if (saveErr) return next(saveErr);
      return req.logIn(user, function (loginErr) {
        if (loginErr) return res.status(401).json({ message: loginErr });
        return res.status(200).json({
          message: 'You have been successfully logged in.'
        });
      });
    });
  });
}

exports.default = {
  login: login,
  logout: logout,
  signUp: signUp
};