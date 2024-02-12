import { Router } from "express";
import userController from "../controllers/userController.js";
const router = Router();

// URL
const URL = {
  GREETINGS: "/api/greetings",
  NOTES: "/api/notes",
};

// TASK1
router.get(URL.GREETINGS, userController.get_name);

// GET
router.get(URL.NOTES, userController.get_all);

// POST
router.post(URL.NOTES, userController.post);

// PUT
router.put(URL.NOTES + "/:id", userController.put);

// DELETE
router.delete(URL.NOTES + "/:id", userController.delete);

export default router;
