import { Router } from "express";

import * as notesController from "controllers/notesController";
import URL from "navigation/pathes";
const notesRouter = Router();

// GET
notesRouter.get(URL.NOTES, notesController.getAllNotes);

// POST
notesRouter.post(URL.NOTES, notesController.createNote);

// PUT
notesRouter.put(URL.NOTES + "/:id", notesController.updateNote);

// DELETE
notesRouter.delete(URL.NOTES + "/:id", notesController.deleteNote);

export default notesRouter;
