'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appConfig = require('../config/appConfig');

exports.default = function (featureName) {
  return 'Attempted to use \'' + featureName + '\' but DB type \'' + _appConfig.DB_TYPE + '\' doesn\'t support it';
};