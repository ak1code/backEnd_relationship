const express = require("express");
const { NoteModal } = require("../Modal/noteModal");
const { auth } = require("../Middleware/authMiddleware");
const noteRoute = express.Router();

noteRoute.get("/", auth, async (req, res) => {
  const note = await NoteModal.find({ userName: req.body.userName });
  res.send(note);
});

noteRoute.post("/createNote", auth, async (req, res) => {
  const note = await new NoteModal(req.body);
  note.save();
  res.send({ message: "note succefully created" });
});

noteRoute.patch("/updateNote", auth, async (req, res) => {
  const payload = req.body;
  const note = await NoteModal.findOneAndUpdate(
    { name: payload.name },
    req.body
  );
  note.save();
  res.send("note succefully updated");
});

noteRoute.delete("/deleteNote", auth, async (req, res) => {
  const payload = req.body;
  const note = await NoteModal.findOneAndDelete(
    { name: payload.name },
    req.body
  );
  note.save();
  res.send("note succefully updated");
});

module.exports = { noteRoute };
