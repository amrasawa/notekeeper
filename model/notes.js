import mongoose from "mongoose";
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  title: String,
  content: String,
  creationDate: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("notes", NoteSchema);
