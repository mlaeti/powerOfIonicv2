'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _sequelize_config = require('../sequelize_config');

var _sequelize_config2 = _interopRequireDefault(_sequelize_config);

var _appConfig = require('../../../config/appConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _sequelize_config2.default[_appConfig.ENV];
var basename = _path2.default.basename(module.filename);
var db = {};
var sequelize = void 0;

var dbUrl = process.env[config.use_env_variable];
if (dbUrl) {
  sequelize = new _sequelize2.default(dbUrl);
} else {
  sequelize = new _sequelize2.default(config.database, config.username, config.password, config);
}

_fs2.default.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize.import(_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

module.exports = db;