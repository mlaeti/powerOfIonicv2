'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = undefined;

var _appConfig = require('../../config/appConfig');

var _sequelize_config = require('./sequelize_config');

var _sequelize_config2 = _interopRequireDefault(_sequelize_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _sequelize_config2.default[_appConfig.ENV];

var db = exports.db = process.env[config.use_env_variable] || config.dialect + '://' + config.username + ':' + config.password + '@' + config.host + '/' + config.database;

exports.default = {
  db: db
};