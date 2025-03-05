import  Express  from "express";
import { getNotes, createNote, updateNote, deleteNote } from "../controller/Controller.js";

const router = Express.Router();

router.get("/notes", getNotes);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);

export default router;