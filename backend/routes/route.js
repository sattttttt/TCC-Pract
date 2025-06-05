import  Express  from "express";
import verifyToken from "../middleware/verifyToken.js";
import { getAllNotes, addNotes, editNotes, deleteNotes } from "../controller/Controller.js";

const router = Express.Router();

router.get("/notes", verifyToken, getAllNotes);
router.post("/notes", verifyToken, addNotes);
router.put("/notes/:id", verifyToken, editNotes);
router.delete("/notes/:id", verifyToken, deleteNotes);

export default router;