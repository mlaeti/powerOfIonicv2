'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.session = exports.passport = exports.controllers = exports.connect = undefined;

var _appConfig = require('../config/appConfig');

var _constants = require('../config/constants');

var dbConfig = null;

/* use inline requires for conditional loading */
switch (_appConfig.DB_TYPE) {
  case _constants.DB_TYPES.MONGO:
    dbConfig = require('./mongo');
    break;
  case _constants.DB_TYPES.POSTGRES:
    dbConfig = require('./postgres');
    break;
  case _constants.DB_TYPES.NONE:
    dbConfig = require('./none');
    break;
  default:
    throw new Error('No database type \'' + _appConfig.DB_TYPE + '\' found');
}

var connect = exports.connect = dbConfig.connect;
var controllers = exports.controllers = dbConfig.controllers;
var passport = exports.passport = dbConfig.passport;
var session = exports.session = dbConfig.session;

exports.default = dbConfig.default;