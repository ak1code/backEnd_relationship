const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: String,
  decription: String,
  userId: String,
  userName: String,
});

const NoteModal = mongoose.model("note", noteSchema);

module.exports = { NoteModal };
