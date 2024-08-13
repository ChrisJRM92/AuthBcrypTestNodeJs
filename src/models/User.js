const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('Users', {
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.TEXT
  },
  dateOfBirth: {
    type: DataTypes.DATE
  },
  isVerified: {
    type: DataTypes.BOOLEAN
  }
});

module.exports = User;