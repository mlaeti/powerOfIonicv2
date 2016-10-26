'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var db = exports.db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost/ReactWebpackNode';

exports.default = {
  db: db
};