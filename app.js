import express from "express";
const app = express();

// dotenv config
import dotenv from "dotenv";
dotenv.config();

// body parser middleware
import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Instance
import db from "./config/database.js";

// import db from './db.config';
// create table if not exists
db.sequelize.sync();

// User Routes
import userRoute from "./routes/userRoute.js";
app.use("/", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT : ${process.env.PORT}`);
});
