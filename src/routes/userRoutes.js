import { Router } from "express";
import * as userController from "../controllers/userController.js";
import URL from "../navigation/pathes.js";
const userRouter = Router();

// TASK1
userRouter.get(URL.GREETINGS, userController.getName);

export default userRouter;
