// Homework READme suggests to use express-handlebars (line 15)
const express = require("express");
const mongoose = require('mongoose');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

    
const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://tphorton:password1@ds123129.mlab.com:23129/heroku_1wc3cmf0", { useNewUrlParser: true });

// GET route for scraping 
app.get("/scrape", function (req, res) {
    axios.get("https://www.c-span.org/").then(function (response) {
        const $ = cheerio.load(response.data);

        //grab element from artice
        $("div.text").each(function (i, element) {

            let results = {};

            //save title and link into properties-- figure out what needs to be saved
            // ref lines 47-52 on activity 20
            results.title = $(this).children("a").children("h3").text();

            results.summary = $(this).children("p").text();

            results.link = $(this).children("a").attr("href");

            db.ScrapeArticle.create(results).then(function (dbScrapeArticle) {
                // res.send(dbScrapeArticle);
            }).catch(function (err) {
                console.log(err);
            });
        });
        // is findAll correct to use?
        db.ScrapeArticle.find().then(collection => res.send(collection))
    });
});

// create GET route to grab specific articles, the populate
app.get("/article", function (req, res) {
    // is findAll correct to use?
    db.ScrapeArticle.find({ where: { saved: false } }).then(function (dbArticle) {
        res.json(dbScrapeArticle);
    }).catch(function (err) {
        res.json(err);
    });
});

app.get("/article/:id", function (req, res) {
    db.ScrapeArticle.findById(req.params.id).populate("note").then(function (dbScrapeArticle) {
        res.json(dbScrapeArticle);
    });
});

app.post('/article/:id', function (req, res) {
    db.ScrapedNote.create(req.body).then(function (dbScrapedNote) {
        return db.ScrapeArticle.findByIdAndUpdate(req.params.id, { $set: dbScrapedNote._id }, { new: true });
    }).then(function (dbScrapeArticle) {
        res.json(dbScrapeArticle);
    });
});





// app.get("/saved", function (req, res) {
//     // is findAll correct to use?
//     db.ScrapeArticle.find({ where: { saved: true } }).then(function (dbArticle) {
//         res.json(dbScrapeArticle);
//     }).catch(function (err) {
//         res.json(err);
//     });
// });
// // // create post route-- bring in exported model from notes.js
// app.post("", funtion(req, res){
//     // refer to 97-102 in activity 20
//     db.ScrapedNote.create(req.body).then(function(db){
//         return db. .findBy( , { $set: {note: db .}, {new: true});
//     }).then(function(db ){
//         res.json(db );
//     });
// });

app.listen(PORT, function () {
    console.log('App listening on port ' + PORT + "!");
});