import Note from "../model/Note.js";

export async function getAllNotes(req, res) {
  try {
    // Fetch all notes, sorting by pinned notes first, then newest created
    const notes = await Note.find().sort({ isPinned: -1, createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ 
      message: 'Server error while fetching notes'
    });
  }
}
export async function createNote(req, res) {
  try {
    const { title, content, category, isPinned } = req.body;

     const newNote = new Note({
      title,
      content,
      category,
      isPinned
    });

    await newNote.save();
    res.status(201).json("Note created successfully");
  } catch (error) {
    res.status(500).json({ 
      message: error.message || 'Validation failed'
    });
  }
}
 
export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content, category, isPinned} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(id, { title, content, category, isPinned},{new : true});

    if (!updatedNote) {
      return res.status(404).json({ 
        message: 'Note not found' 
      });
    }
    res.status(200).json({ message: 'Note updated successfully' });

  } catch (error) {
    res.status(400).json({ 
      message: error.message || 'Update failed' 
    });
  }
}
 
export async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ 
        message: 'Note not found' 
      });
    }

    res.status(200).json({ 
      message: 'Note deleted successfully' 
    });
  } catch (error) {
    res.status(400).json({ 
      message: error.message || 'Deletion failed' 
    });
  }
}