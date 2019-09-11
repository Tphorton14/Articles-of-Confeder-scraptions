const mongoose = require("mongoose");

const Schema = mongoose.Schema

const NoteSchema = new Schema({
    title: String,
    body: String
});

const ScrapedNote = mongoose.model("Note", NoteSchema);

module.exports = ScrapedNote;