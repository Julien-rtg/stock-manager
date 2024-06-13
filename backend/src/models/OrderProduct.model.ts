import { Model } from "sequelize";
import { sequelize } from "../db/db.ts";

class OrderProduct extends Model {}

OrderProduct.init(
  {},
  { sequelize, modelName: "order_products", timestamps: true }
);

export { OrderProduct };
