'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.session = exports.passport = exports.controllers = exports.connect = undefined;

var _sequelize = require('../sequelize');

var _session = require('./session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.connect = _sequelize.connect;
exports.controllers = _sequelize.controllers;
exports.passport = _sequelize.passport;
exports.session = _session2.default;
exports.default = {
  connect: _sequelize.connect,
  controllers: _sequelize.controllers,
  passport: _sequelize.passport,
  session: _session2.default
};