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

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Topic = _models2.default.Topic;
var sequelize = _models2.default.sequelize;

/**
 * List
 */
function all(req, res) {
  Topic.findAll().then(function (topics) {
    res.json(topics);
  }).catch(function (err) {
    console.log(err);
    res.status(500).send('Error in first query');
  });
}

/**
 * Add a Topic
 */
function add(req, res) {
  Topic.create(req.body).then(function () {
    res.status(200).send('OK');
  }).catch(function (err) {
    console.log(err);
    res.status(400).send(err);
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
    Topic.update(data, { where: query }).then(function () {
      res.status(200).send('Updated successfully');
    }).catch(function (err) {
      console.log(err);
      res.status(500).send('We failed to save for some reason');
    });
  } else {
    var sign = isIncrement ? '+' : '-';
    Topic.update({
      count: sequelize.literal('count' + sign + '1')
    }, { where: query }).then(function () {
      res.status(200).send('Updated successfully');
    }).catch(function (err) {
      console.log(err);
      // Not sure if server status is the correct status to return
      res.status(500).send('We failed to save for some reason');
    });
  }
}

/**
 * Remove a topic
 */
function remove(req, res) {
  Topic.destroy({ where: { id: req.params.id } }).then(function () {
    res.status(200).send('Removed Successfully');
  }).catch(function (err) {
    console.log(err);
    res.status(500).send('We failed to delete for some reason');
  });
}

exports.default = {
  all: all,
  add: add,
  update: update,
  remove: remove
};