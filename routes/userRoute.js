import express from "express";
const userRoute = express();

// Import Controller
import UserController from "../controller/userController.js";
import { registerValidation } from "../middleware/userValidation.js";
import { expressValidationResult } from "../helper/validationError.js";

// Routes Definition    POST REQUEST
userRoute.post("/create-user", registerValidation, expressValidationResult, UserController.createUser);

export default userRoute;
