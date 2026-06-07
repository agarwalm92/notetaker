import express from "express";
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/createNote", createNote);
router.put("/:id", updateNote);
router.post("/:id", deleteNote);


export default router;