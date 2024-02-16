import { Router } from "express";
import userController from "../controllers/userController.js";
import URL from "../navigation/pathes.js";
const userRouter = Router();

// TASK1
userRouter.get(URL.GREETINGS, userController.get_name);

export default userRouter;
