const mongoose = require("mongoose");
const Schema = mongoose.Schema

// find new requirements for ScrapeArticles
const ArticlesSchema = new Schema ({
        title: {
            type: String,
            require: true
        },
        link: {
            type: String,
            require: true
        },
        note: {
            type: Schema.Types.ObjectId.Id,
            ref: "Note"
        }
    
});

const ScrapeArticle = mongoose.model("Articles", ArticlesSchema);

module.exports = ScrapeArticle;