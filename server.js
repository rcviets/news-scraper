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
app.use(express.static("public"));

//Set Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Use Deployed Database or Local Database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Connect to Mongo DB
mongoose.connect(MONGODB_URI);
console.log("Running on Port " + PORT);


//ROUTES

//GET Route To Scrape Website
app.get("/scrape", function(req, res) {
    axios.get("https://www.fark.com/").then(function(response) {
        var $ = cheerio.load(response.data);

        $("tr td").each(function(i, element) {
            const result = {};
            
            //Result Object
            result.title = $(this).children(".headlineText").children(".headline").children("a").text();
            result.link = $(this).children(".headlineText").children(".headline").children("a").attr("href");

            //Create Article From Result Object
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
        res.send("Scrape Completed");
    });
});