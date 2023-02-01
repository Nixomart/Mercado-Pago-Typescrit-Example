import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("mp_ts", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});
