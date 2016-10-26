'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Token = sequelize.define('Token', {
    kind: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accessToken: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    timestamps: false,

    classMethods: {
      associate: function associate(models) {
        Token.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });

  return Token;
};