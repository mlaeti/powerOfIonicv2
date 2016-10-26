'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // Find the appropriate database to connect to, default to localhost if not found.
  var connect = function connect() {
    _mongoose2.default.connect(_constants.db, function (err) {
      if (err) {
        console.log('===>  Error connecting to ' + _constants.db);
        console.log('Reason: ' + err);
      } else {
        console.log('===>  Succeeded in connecting to ' + _constants.db);
      }
    });
  };
  connect();

  _mongoose2.default.connection.on('error', console.log);
  _mongoose2.default.connection.on('disconnected', connect);

  // Register schema as mongoose model
  var modelPath = _path2.default.join(__dirname, 'models');
  _fs2.default.readdirSync(modelPath).forEach(function (file) {
    if (~file.indexOf('.js')) require(modelPath + '/' + file);
  });
};