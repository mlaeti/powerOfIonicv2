'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Other oauthtypes to be added

/*
 User Schema
 */

/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

var UserSchema = new _mongoose2.default.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  tokens: Array,
  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    picture: { type: String, default: '' }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {}
});

function encryptPassword(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  return _bcryptNodejs2.default.genSalt(5, function (saltErr, salt) {
    if (saltErr) return next(saltErr);
    return _bcryptNodejs2.default.hash(user.password, salt, null, function (hashErr, hash) {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword: function comparePassword(candidatePassword, cb) {
    _bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
};

/**
 * Statics
 */

UserSchema.statics = {};

exports.default = _mongoose2.default.model('User', UserSchema);