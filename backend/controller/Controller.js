import Note from "../model/model.js";
import User from "../model/usermodel.js";


const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({
            where: { user_id: req.userId },
            order: [['createdAt', 'DESC']],
        });

        const user = await User.findByPk(req.userId, {
            attributes: ['name', 'email'], 
        });

        res.status(200).json({
            message: "Notes fetched successfully",
            data: notes,
            user: user, 
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch notes",
            error: error.message
        });
    }
};


const addNotes = async (req, res) => {
    try {
        const {notesTitle, notesContent} = req.body;

        if (!notesTitle || !notesContent) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newNote = await Note.create({
            notesTitle,
            notesContent,
            user_id: req.userId 
        });

        res.status(201).json({
            message: "Note added successfully",
            data: newNote
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add note",
            error: error.message
        });
    }
};


const editNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const { notesTitle, notesContent } = req.body;

        const note = await Note.findOne({
            where: { id, user_id: req.userId } 
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        await note.update({
            notesTitle: notesTitle || note.notesTitle,
            notesContent: notesContent || note.notesContent
            // title: title || note.title,
            // description: description || note.description,
            // category: category || note.category,
            // date: date || note.date
        });

        res.status(200).json({
            message: "Note updated successfully",
            data: note
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update note",
            error: error.message
        });
    }
};


const deleteNotes = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await Note.findOne({
            where: { id, user_id: req.userId }
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        await note.destroy();

        res.status(200).json({
            message: "Note deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete note",
            error: error.message
        });
    }
};

export { getAllNotes, addNotes, editNotes, deleteNotes };