'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = all;
exports.add = add;
exports.update = update;
exports.remove = remove;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _topics = require('../models/topics');

var _topics2 = _interopRequireDefault(_topics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List
 */
function all(req, res) {
  _topics2.default.find({}).exec(function (err, topics) {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }

    return res.json(topics);
  });
}

/**
 * Add a Topic
 */
function add(req, res) {
  _topics2.default.create(req.body, function (err) {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }

    return res.status(200).send('OK');
  });
}

/**
 * Update a topic
 */
function update(req, res) {
  var query = { id: req.params.id };
  var isIncrement = req.body.isIncrement;
  var isFull = req.body.isFull;
  var omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  var data = _lodash2.default.omit(req.body, omitKeys);

  if (isFull) {
    _topics2.default.findOneAndUpdate(query, data, function (err) {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  } else {
    _topics2.default.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1 : -1 } }, function (err) {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  }
}

/**
 * Remove a topic
 */
function remove(req, res) {
  var query = { id: req.params.id };
  _topics2.default.findOneAndRemove(query, function (err) {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

exports.default = {
  all: all,
  add: add,
  update: update,
  remove: remove
};