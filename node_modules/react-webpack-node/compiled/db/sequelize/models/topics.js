'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Topic', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    text: DataTypes.STRING,
    count: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0
      }
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    }
  }, {
    timestamps: false
  });
};