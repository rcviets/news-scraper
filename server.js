//Required Packages
const mongoose = require("mongoose");

//Use Deployed Database or Local Database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect to Mongo DB
mongoose.connect(MONGODB_URI);