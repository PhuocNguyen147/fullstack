'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'adminb1809281@gmail.com',
      password: '12345678',
      firstName: 'Phuoc',
      lastName: 'Nguyen',
      address: 'Can Tho',
      gender: 'M',
      roleId: 'ROLE',
      phonenumber: '1809281',
      positionId: '001',
      image: 'demo ',


      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
