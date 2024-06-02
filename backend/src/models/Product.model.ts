import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.ts";

class Product extends Model {
  declare public id: number;
  declare public name: string;
  declare public price: number;
  declare public description: string;
  declare public stock_changes: Array<{ quantity_at_time: number }>;
}

Product.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true, defaultValue: "" }
  },
  { sequelize, modelName: "product", timestamps: true }
);

export { Product };
