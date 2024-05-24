import { Attribute, NotNull } from "@sequelize/core/decorators-legacy";
import { sequelize } from "../db/db";
import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  DataTypes,
} from "@sequelize/core";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Attribute(DataTypes.TEXT)
  @NotNull
  declare username: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare password: string;

  @Attribute(DataTypes.TEXT)
  @NotNull
  declare email: string;
  private connection: Sequelize = sequelize;

  public async createUser(): Promise<any> {
    const UserInstance = this.connection.define("user", {
      username: DataTypes.TEXT,
      password: DataTypes.TEXT,
      email: DataTypes.TEXT,
    });
    return UserInstance;
  }

  public async syncDb() {
    await this.createUser();
    this.connection.sync({ force: true });
  }
}