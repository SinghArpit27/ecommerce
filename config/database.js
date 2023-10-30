import { Sequelize } from "sequelize";
import createUsersModel from "../models/user.js";

const dbName = "ecommerce";
const dbUser = "root";
const dbPassword = "Arpit@#123";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Models-table
db.users = createUsersModel(sequelize, Sequelize);

export default db;
