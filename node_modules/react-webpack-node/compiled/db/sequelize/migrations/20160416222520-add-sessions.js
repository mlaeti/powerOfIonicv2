'use strict';

module.exports = {
  up: function up(queryInterface, DataTypes) {
    return queryInterface.createTable('session', {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      sess: {
        type: DataTypes.JSON
      },
      expire: {
        type: DataTypes.DATE
      }
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('session');
  }
};