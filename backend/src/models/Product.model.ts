import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.ts";

class Product extends Model {
  declare public id: number;
  declare public name: string;
  declare public price: number;
}

Product.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize, modelName: "product", timestamps: true }
);

await Product.sync();

export { Product };
