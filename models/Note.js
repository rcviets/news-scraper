//Required Packages && Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create New Schema Object
const NoteSchema = new Schema({
    title: String,
    body: String
});

//Create New Model From Schema
const Note = mongoose.model("Note", NoteSchema);

//Export Model
module.exports = Note;