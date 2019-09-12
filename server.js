const express = require("express");
const mongoose = require('mongoose');

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/ArtcleScrape", { useNewUrlParser: true});

// GET route for scraping 
app.get("/scrape", function (req, res){
    axios.get("https://www.c-span.org/").then(function(response){
        const $ = cheerio.load(response.data);

        //grab element from artice
        $("div.text").each(function(i,element) {
    
            let results = {};

            //save title and link into properties-- figure out what needs to be saved
            // ref lines 47-52 on activity 20
            results.title = $(this).children("a").children("h3").text();
            
            results.summary = $(this).children("p").text();

            results.link = $(this).children("a").attr("href");
            console.log(results);

            // db.ScrapeArticle.create(results).then(function(dbScrapeArticle){
            //     console.log(dbScrapeArticle);
            // }).catch(function (err){
            //     console.log(err);
            // });
        });
        res.send("You're scrape has been completed!");
    });
});

// create GET route to grab specific articles, the populate
// app.get("", fuction(req, res){

//     // refer to 82-85 in activity 20
//     db. .findBy().populate("note").then(function(db ){
//         res.json(db)
//     });
// });

// // create post route-- bring in exported model from notes.js
// app.post("", funtion(req, res){
//     // refer to 97-102 in activity 20
//     db.ScrapedNote.create(req.body).then(function(db){
//         return db. .findBy( , { $set: {note: db .}, {new: true});
//     }).then(function(db ){
//         res.json(db );
//     });
// });

app.listen(PORT, function() {
    console.log('App listening on port ' + PORT + "!");
});