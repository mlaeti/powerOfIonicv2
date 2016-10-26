'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;

exports.default = function (email, password, done) {
  return User.findOne({ where: { email: email } }).then(function (user) {
    if (!user) return done(null, false, { message: 'There is no record of the email ' + email + '.' });
    return user.comparePassword(password).then(function () {
      return done(null, user);
    }, function () {
      return done(null, false, { message: 'Your email/password combination is incorrect.' });
    });
  }).catch(function (err) {
    console.log(err);
    done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
};