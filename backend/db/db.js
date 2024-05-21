const mariadb = require("mariadb");
require('dotenv').config()
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

const connect = async() => {
  let conn;
  try {
    conn = await pool.getConnection();
  } finally {
    if (conn) {
      conn.release(); //release to pool
    }
  }

  return conn;
}