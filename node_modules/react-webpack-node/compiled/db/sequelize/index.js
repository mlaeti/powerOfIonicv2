'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passport = exports.controllers = exports.connect = undefined;

var _connect = require('./connect');

var _connect2 = _interopRequireDefault(_connect);

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _passport = require('./passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.connect = _connect2.default;
exports.controllers = _controllers2.default;
exports.passport = _passport2.default;
exports.default = {
  connect: _connect2.default,
  controllers: _controllers2.default,
  passport: _passport2.default
};