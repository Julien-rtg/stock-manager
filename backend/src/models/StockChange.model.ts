import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.ts";

class StockChange extends Model {
  declare public id: number;
  declare public quantity: number;
  declare public quantity_at_time: number;
  declare public date: Date;
}

StockChange.init(
  {
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    quantity_at_time: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false }
  },
  { sequelize, modelName: "stock_change", timestamps: true }
);

export { StockChange };
