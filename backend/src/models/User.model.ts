import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db.ts";

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  
}

User.init(
  {
    username: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "user", timestamps: true }
);

export { User };
