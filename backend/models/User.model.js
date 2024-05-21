const e = require('express');
const { DataTypes } = require('sequelize');
const sequelize = require('../db/db').sequelize;

const User = sequelize.define('user', {
  username: DataTypes.TEXT,
  password: DataTypes.TEXT,
  email: DataTypes.TEXT
});

module.exports = User;