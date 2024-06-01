import { sequelize } from "../db/db.ts";
import { Product } from "./Product.model.ts";
import { StockChange } from "./StockChange.model.ts";
import { User } from "./User.model.ts";


Product.hasMany(StockChange);
StockChange.belongsTo(Product);

await sequelize.sync({ alter: true });

export { Product, StockChange, User };