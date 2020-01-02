//Required Packages
const mongoose = require("mongoose");
const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("./models");

//Set PORT
const PORT = 3000;

//Initialize Express
const app = express();

//Middleware

//Logging Requests
app.use(logger("dev"));
//Parse Body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Static Folder = Public
app.use(express.stating("public"));

//Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Use Deployed Database or Local Database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect to Mongo DB
mongoose.connect(MONGODB_URI);