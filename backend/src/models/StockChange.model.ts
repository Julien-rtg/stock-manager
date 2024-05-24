import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  Sequelize
} from '@sequelize/core';
import {
  PrimaryKey,
  Attribute,
  AutoIncrement,
  NotNull,
  HasOne,
} from '@sequelize/core/decorators-legacy';
import { sequelize } from '../db/db';
import { Product } from "./Product.model";

export class StockChange extends Model<
  InferAttributes<StockChange>,
  InferCreationAttributes<StockChange>
> {
  @Attribute(DataTypes.INTEGER)
  @AutoIncrement
  @PrimaryKey
  declare id: CreationOptional<number>;

  @HasOne(() => Product, "product_id")
  declare product?: NonAttribute<Product>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare product_id: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare quantity: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare quantity_at_time: number;

  @Attribute(DataTypes.DATE)
  @NotNull
  declare date: Date;
  
  private connection: Sequelize = sequelize;

  public async createStockChange(): Promise<any> {
    const UserInstance = this.connection.define("stock_change", {
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      quantity_at_time: DataTypes.INTEGER,
      date: DataTypes.DATE,
    });
    return UserInstance;
  }

  public async syncDb() {
    await this.createStockChange();
    this.connection.sync({ force: true });
  }
}
