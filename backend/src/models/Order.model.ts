import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.ts";

class Order extends Model {
  declare public id: number;
  declare public total_price: number;
}

Order.init(
  {
    total_price: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "order", timestamps: true }
);

export { Order };
