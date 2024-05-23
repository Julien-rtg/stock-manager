const { DataTypes } = require('sequelize');
const db = require('../db/db');

class User {
    
  constructor() {
    this.sequelize = db.getConnection();
  }
  
  async createUser () {
    const UserInstance = (await this.sequelize).define('user', {
      username: DataTypes.TEXT,
      password: DataTypes.TEXT,
      email: DataTypes.TEXT
    });
    return UserInstance;
  }

  async syncDb () {
    await this.createUser();
    (await this.sequelize).sync({ force: true });
  }
}

const user = new User();

module.exports = user;