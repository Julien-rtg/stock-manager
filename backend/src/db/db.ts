import dotenv from "dotenv";
import { StockChange } from "../models/StockChange.model";
import { Product } from "../models/Product.model";
import { Sequelize, importModels } from "@sequelize/core";
import { User } from "../models/User.model";
dotenv.config();

import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mariadb",
    models: await importModels(__dirname + '/**/*.model.{ts,js}'),
  }
);
