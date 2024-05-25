import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mariadb"
  }
);