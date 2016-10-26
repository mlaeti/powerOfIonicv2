'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _connectPgSimple = require('connect-pg-simple');

var _connectPgSimple2 = _interopRequireDefault(_connectPgSimple);

var _constants = require('../sequelize/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PGStore = (0, _connectPgSimple2.default)(_expressSession2.default);

exports.default = function () {
  return new PGStore({
    pg: _pg2.default,
    conString: _constants.db
  });
};