'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = _models2.default.sequelize;
var User = _models2.default.User;

/* eslint-disable no-param-reassign */
function attachGoogleAccount(user, profile, accessToken, done) {
  user.google = profile.id;
  user.name = user.name || profile.displayName;
  user.gender = user.gender || profile._json.gender;
  user.picture = user.picture || profile._json.picture;

  return sequelize.transaction(function (transaction) {
    return user.save({ transaction: transaction }).then(function () {
      return user.createToken({
        kind: 'google',
        accessToken: accessToken
      }, { transaction: transaction });
    });
  }).then(function () {
    return done(null, user, { message: 'Google account has been linked.' });
  });
}
/* eslint-enable no-param-reassign */

function createUserWithToken(profile, accessToken, done) {
  return sequelize.transaction(function (transaction) {
    return User.create({
      email: profile._json.emails[0].value,
      google: profile.id,
      name: profile.displayName,
      gender: profile._json.gender,
      picture: profile._json.picture
    }, { transaction: transaction }).then(function (user) {
      return user.createToken({
        kind: 'google',
        accessToken: accessToken
      }, { transaction: transaction }).then(function () {
        return done(null, user);
      });
    });
  });
}

var existingGoogleAccountMessage = ['There is already a Google account that belongs to you.', 'Sign in with that account or delete it, then link it with your current account.'].join(' ');

var existingEmailUserMessage = ['There is already an account using this email address.', 'Sign in to that account and link it with Google manually from Account Settings.'].join(' ');

exports.default = function (req, accessToken, refreshToken, profile, done) {
  return User.findOne({
    where: { google: profile.id }
  }).then(function (existingUser) {
    if (req.user) {
      if (existingUser) {
        return done(null, false, { message: existingGoogleAccountMessage });
      }
      return User.findById(req.user.id).then(function (user) {
        return attachGoogleAccount(user, profile, accessToken, done);
      });
    }

    if (existingUser) return done(null, existingUser);

    return User.findOne({
      where: { email: profile._json.emails[0].value }
    }).then(function (existingEmailUser) {
      if (existingEmailUser) {
        return done(null, false, { message: existingEmailUserMessage });
      }
      return createUserWithToken(profile, accessToken, done);
    });
  }).catch(function (err) {
    console.log(err);
    return done(null, false, { message: 'Something went wrong trying to authenticate' });
  });
};