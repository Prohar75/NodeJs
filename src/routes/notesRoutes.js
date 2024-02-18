import { Router } from "express";
import notesController from "../controllers/notesController.js";
import URL from "../navigation/pathes.js";
const notesRouter = Router();

// GET
notesRouter.get(URL.NOTES, notesController.get_all);

// POST
notesRouter.post(URL.NOTES, notesController.post);

// PUT
notesRouter.put(URL.NOTES + "/:id", notesController.put);

// DELETE
notesRouter.delete(URL.NOTES + "/:id", notesController.delete);

export default notesRouter;
