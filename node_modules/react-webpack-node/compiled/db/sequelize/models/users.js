'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bcrypt = _bluebird2.default.promisifyAll(_bcryptNodejs2.default);

// Other oauthtypes to be added

/* eslint-disable no-param-reassign */
function hashPassword(user) {
  if (!user.changed('password')) return null;
  return bcrypt.genSaltAsync(5).then(function (salt) {
    return bcrypt.hashAsync(user.password, salt, null).then(function (hash) {
      user.password = hash;
    });
  });
}
/* eslint-enable no-param-reassign */

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    website: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    resetPasswordToken: {
      type: DataTypes.STRING
    },
    resetPasswordExpires: {
      type: DataTypes.DATE
    },
    google: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,

    classMethods: {
      associate: function associate(models) {
        User.hasMany(models.Token, {
          foreignKey: 'userId'
        });
      }
    },

    instanceMethods: {
      comparePassword: function comparePassword(candidatePassword) {
        return bcrypt.compareAsync(candidatePassword, this.password);
      },
      toJSON: function toJSON() {
        return {
          id: this.id,
          email: this.email,
          profile: {
            name: this.name,
            gender: this.gender,
            location: this.location,
            website: this.website,
            picture: this.picture
          }
        };
      }
    }
  });

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};