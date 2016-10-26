'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopicSchema = new _mongoose2.default.Schema({
  id: String,
  text: String,
  count: { type: Number, min: 0 },
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
/**
 * Schema Definitions
 *
 */
exports.default = _mongoose2.default.model('Topic', TopicSchema);