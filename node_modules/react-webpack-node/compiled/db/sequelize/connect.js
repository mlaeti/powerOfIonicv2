'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = _models2.default.sequelize;

exports.default = function () {
  sequelize.authenticate().then(function () {
    console.log('Successfully connected to sequelize database');
  }, function (err) {
    console.log('Unable to connect to the sequelize database: ', err);
  });
};