const { analyzeSentiment } = require('../utils/sentimentAnalyzer');
const JournalEntry = require('../models/journalEntry');

// Create Journal Entry
exports.createJournalEntry = async (req, res) => {
    try {
        const { text, mood } = req.body;

        if (!text || !mood) {
            return res.status(400).json({
                error: "Please provide both text and mood"
            });
        }

        const sentiment = analyzeSentiment(text);

        const newEntry = {
            text,
            mood: mood || sentiment.mood,
            sentimentScore: sentiment.score,
            createdAt: new Date()
        };

        const savedEntry = await JournalEntry.create(newEntry);

        res.status(201).json({
            success: true,
            data: savedEntry
        });

    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            details: error.message
        });
    }
};


// Get All Journal Entries
exports.getUserJournalEntries = async (req, res) => {
    try {

        const entries = await JournalEntry.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: entries.length,
            data: entries
        });

    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            details: error.message
        });
    }
};


// Delete Entry
exports.deleteJournalEntry = async (req, res) => {
    try {

        const { id } = req.params;

        const deleted = await JournalEntry.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                error: "Journal entry not found"
            });
        }

        res.json({
            success: true,
            message: "Entry deleted"
        });

    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            details: error.message
        });
    }
};


// Mood Insights
exports.getMoodInsights = async (req, res) => {

    try {

        const journalEntries = await JournalEntry.find();

        if (journalEntries.length === 0) {
            return res.json({
                success: true,
                data: {
                    totalEntries: 0,
                    mostFrequentMood: null,
                    positiveVsNegativeRatio: null
                }
            });
        }

        const moodCounts = {};
        let positive = 0;
        let negative = 0;

        journalEntries.forEach(entry => {

            moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;

            if (entry.sentimentScore >= 0.6) positive++;
            if (entry.sentimentScore <= 0.4) negative++;

        });

        let mostFrequentMood = Object.keys(moodCounts).reduce((a, b) =>
            moodCounts[a] > moodCounts[b] ? a : b
        );

        res.json({
            success: true,
            data: {
                totalEntries: journalEntries.length,
                mostFrequentMood,
                positiveEntries: positive,
                negativeEntries: negative
            }
        });

    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            details: error.message
        });
    }
};