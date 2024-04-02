import { Router } from "express";

import * as userController from "controllers/userController";
import URL from "navigation/pathes";
const userRouter = Router();

// TASK1
userRouter.get(URL.GREETINGS, userController.getName);

export default userRouter;
