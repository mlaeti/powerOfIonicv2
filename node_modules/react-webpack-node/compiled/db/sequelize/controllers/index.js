'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.users = exports.topics = undefined;

var _topics = require('./topics');

var _topics2 = _interopRequireDefault(_topics);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.topics = _topics2.default;
exports.users = _users2.default;
exports.default = {
  topics: _topics2.default,
  users: _users2.default
};