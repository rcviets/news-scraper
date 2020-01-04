//Required Packages && Schema
const mongoose = require("mongoose");
const Schema = monsgoose.Schema;

//Create Mongoose Object
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//Mongoose Model Method
const Article = mongoose.model("Article", ArticleSchema);

//Export Article Model
module.exports = Article;