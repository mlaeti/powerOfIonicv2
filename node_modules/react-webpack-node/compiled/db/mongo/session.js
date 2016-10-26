'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _connectMongo = require('connect-mongo');

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);

exports.default = function () {
  return new MongoStore({
    url: _constants.db,
    autoReconnect: true
  });
};