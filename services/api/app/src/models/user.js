'use strict';
const uuidv4 = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    email: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        }
      }
    });
  User.associate = function (models) {
    // associations can be defined here
  };
  //Initilize table with some data
  User.init = async () => {
    await User.sync();
    let rowNumber = await User.count();
    if (rowNumber == 0) {
      User.create({
        id: uuidv4(),
        user_name: 'Ho Quoc Huy',
        email: 'admin@demo.com',
        password: "$2a$10$6CDo6HoAWI0VaRppQassOu3p.M7dn28iAYmX2DFTrkTlBq34EA0qy",
        avatar: 'https://cdn2.vectorstock.com/i/thumbs/21/51/cartoon-monster-face-halloween-vector-16972151.jpg',
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  return User;
};