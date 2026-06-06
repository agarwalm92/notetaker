import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A note title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
      type: String,
      required: [true, 'Note content cannot be empty']
    },
    category: {
      type: String,
      default: 'General',
      enum: ['General', 'Work', 'Personal', 'Ideas'] // Restricts to these categories
    },
    isPinned: {
      type: Boolean,
      default: false
    }
  },
  {
    // 2. Automatically adds 'createdAt' and 'updatedAt' fields to the document
    timestamps: true 
  }
);

// 3. Create and export the Model based on the Schema
const Note = mongoose.model('Note', noteSchema);

export default Note;