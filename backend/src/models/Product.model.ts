import Sequelize, {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "@sequelize/core";
import { Attribute, NotNull } from "@sequelize/core/decorators-legacy";
import { sequelize } from "../db/db";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  // This is the foreign key
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare product_id: number;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare price: number;

  private connection: Sequelize = sequelize;

  public async createProduct(): Promise<any> {
    const ProductInstance = this.connection.define("product", {
      name: DataTypes.TEXT,
      price: DataTypes.INTEGER,
    });
    return ProductInstance;
  }

  public async syncDb() {
    await this.createProduct();
    this.connection.sync({ force: true });
  }
}
