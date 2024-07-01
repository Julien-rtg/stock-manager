import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.ts";

class OrderProduct extends Model {}

OrderProduct.init(
  {
    quantity_ordered: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "order_products", timestamps: true }
);

export { OrderProduct };
