const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        required: true
    },
    sentimentScore: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);