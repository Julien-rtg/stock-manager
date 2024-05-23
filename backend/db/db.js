const { Sequelize } = require('sequelize');
require('dotenv').config();

class Db {

  async connect() {
    return new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: 'localhost',
      dialect: 'mariadb'
    });
  }

  async getConnection() {
    if (!this.connection) {
      this.connection = await this.connect();
    }
    return this.connection;
  }

  async authenticate() {
    this.getConnection().authenticate().then(() => {
      console.log('Connection has been established successfully.');
    }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
    });
  }

}

const db = new Db();

module.exports = db;