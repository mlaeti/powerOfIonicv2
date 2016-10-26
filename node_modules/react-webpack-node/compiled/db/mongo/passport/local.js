'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (email, password, done) {
  _user2.default.findOne({ email: email }, function (findErr, user) {
    if (!user) return done(null, false, { message: 'There is no record of the email ' + email + '.' });
    return user.comparePassword(password, function (passErr, isMatch) {
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Your email or password combination is not correct.' });
    });
  });
};