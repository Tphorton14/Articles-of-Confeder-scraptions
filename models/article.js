const mongoose = require("mongoose");
const Schema = mongoose.Schema

// find new requirements for ScrapeArticles
const ArticleSchema = new Schema ({
        title: {
            type: String,
            require: true
        },
        summary: {
            type: String,
            require: true
        },
        link: {
            type: String,
            require: true
        },
        note: {
            type: Schema.Types.ObjectId,
            ref: "Note"
        },
        saved: {
            type: Boolean,
            default: false
        }
        
    
});

const ScrapeArticle = mongoose.model("Articles", ArticleSchema);

module.exports = ScrapeArticle;