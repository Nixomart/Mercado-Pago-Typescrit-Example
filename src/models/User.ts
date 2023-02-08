import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../database/database";

class User extends Model {
 
  public id!: number;
  public username!: string;
  public password_hash!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static comparePassword(password: string, password_hash: string) {
    return bcrypt.compareSync(password, password_hash);
  }

  static async encryptPassword(password: string) {
    const salt = await bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: false,
  }
);

export default User