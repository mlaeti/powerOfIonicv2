'use strict';

module.exports = {
  up: function up(queryInterface, DataTypes) {
    queryInterface.addColumn('Users', 'google', DataTypes.STRING);
  },
  down: function down(queryInterface) {
    queryInterface.removeColumn('Users', 'google');
  }
};