import { sequelize } from "../db/db.ts";
import { Order } from "./Order.model.ts";
import { OrderProduct } from "./OrderProduct.model.ts";
import { Product } from "./Product.model.ts";
import { StockChange } from "./StockChange.model.ts";
import { User } from "./User.model.ts";

Product.hasMany(StockChange, { onDelete: "CASCADE" });
StockChange.belongsTo(Product);

Product.belongsToMany(Order, { through: OrderProduct });
Order.belongsToMany(Product, { through: OrderProduct });

await sequelize.sync({ alter: true });

export { Product, StockChange, User };
