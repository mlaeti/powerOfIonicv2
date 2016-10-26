'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
exports.default = function (req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    return _user2.default.findOne({ google: profile.id }, function (findOneErr, existingUser) {
      if (existingUser) {
        return done(null, false, { message: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
      }
      return _user2.default.findById(req.user.id, function (findByIdErr, user) {
        user.google = profile.id;
        user.tokens.push({ kind: 'google', accessToken: accessToken });
        user.profile.name = user.profile.name || profile.displayName;
        user.profile.gender = user.profile.gender || profile._json.gender;
        user.profile.picture = user.profile.picture || profile._json.picture;
        user.save(function (err) {
          done(err, user, { message: 'Google account has been linked.' });
        });
      });
    });
  }
  return _user2.default.findOne({ google: profile.id }, function (findByGoogleIdErr, existingUser) {
    if (existingUser) return done(null, existingUser);
    return _user2.default.findOne({ email: profile._json.emails[0].value }, function (findByEmailErr, existingEmailUser) {
      if (existingEmailUser) {
        return done(null, false, { message: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.' });
      }
      var user = new _user2.default();
      user.email = profile._json.emails[0].value;
      user.google = profile.id;
      user.tokens.push({ kind: 'google', accessToken: accessToken });
      user.profile.name = profile.displayName;
      user.profile.gender = profile._json.gender;
      user.profile.picture = profile._json.picture;
      return user.save(function (err) {
        done(err, user);
      });
    });
  });
};
/* eslint-enable no-param-reassign */