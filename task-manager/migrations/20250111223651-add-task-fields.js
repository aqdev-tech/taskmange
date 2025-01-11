'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Tasks', 'priority', {
      type: Sequelize.ENUM('high', 'medium', 'low'),
      defaultValue: 'medium'
    });
    await queryInterface.addColumn('Tasks', 'dueDate', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('Tasks', 'category', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Tasks', 'status', {
      type: Sequelize.ENUM('not started', 'in progress', 'completed'),
      defaultValue: 'not started'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Tasks', 'priority');
    await queryInterface.removeColumn('Tasks', 'dueDate');
    await queryInterface.removeColumn('Tasks', 'category');
    await queryInterface.removeColumn('Tasks', 'status');
  }
};
