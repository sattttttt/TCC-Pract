import Note from "../model/model.js";


async function getNotes(req, res) {
    try {
        const notes = await Note.findAll();
        res.status(200).json(notes);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function createNote(req, res) {
    try {
        const { notesTitle, notesContent } = req.body;
        const note = await Note.create({ notesTitle, notesContent });
        res.status(201).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateNote(req, res) {
    try {
        const { id } = req.params;
        const { notesTitle, notesContent } = req.body;
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        note.notesTitle = notesTitle;
        note.notesContent = notesContent;
        await note.save();
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }
        await note.destroy();
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export { getNotes, createNote, updateNote, deleteNote };