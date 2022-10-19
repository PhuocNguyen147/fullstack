'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      emmail: 'adminb1809281@gmail.com',
      password: '12345678',
      firstName: 'Phuoc',
      lastName: 'Nguyen',
      address: 'Can Tho',
      gender: 1,
      roleId: 'ROLE',
      keyRole: 'R1',
      phonenumber: '1809281',
      positionId: '001',
      image: 'demo thôi',


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
