'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _local = require('./passport/local');

var _local2 = _interopRequireDefault(_local);

var _google = require('./passport/google');

var _google2 = _interopRequireDefault(_google);

var _db = require('../db');

var _unsupportedMessage = require('../db/unsupportedMessage');

var _unsupportedMessage2 = _interopRequireDefault(_unsupportedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.

  if (_db.passport && _db.passport.deserializeUser) {
    _passport2.default.serializeUser(function (user, done) {
      done(null, user.id);
    });

    _passport2.default.deserializeUser(_db.passport.deserializeUser);
  } else {
    console.warn((0, _unsupportedMessage2.default)('(de)serialize User'));
  }

  // use the following strategies
  (0, _local2.default)(_passport2.default);
  (0, _google2.default)(_passport2.default);
}; /* Initializing passport.js */