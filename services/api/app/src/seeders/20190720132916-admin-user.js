'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert('Users', [{
    //   user_name: 'Ho Quoc Huy',
    //   email: 'admin@demo.com',
    //   password: "$2a$10$6CDo6HoAWI0VaRppQassOu3p.M7dn28iAYmX2DFTrkTlBq34EA0qy",
    //   avatar: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiI1uL90MPjAhUgyYsBHfuAB9MQjRx6BAgBEAU&url=https%3A%2F%2Ftopanhdepnhat.net%2F100-hinh-anh-quynh-aka-de-thuong-lam-anh-bia-va-avatar.html&psig=AOvVaw0HWv422hHJ9SJ_ebsL2ByW&ust=1563716727654630',
    //   role: 0,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
