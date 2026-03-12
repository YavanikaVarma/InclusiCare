const { analyzeSentiment } = require('../utils/sentimentAnalyzer');

// Temporary storage (instead of database)
let journalEntries = [];

// Create Journal Entry
exports.createJournalEntry = (req, res) => {
    try {
        const { text, mood } = req.body;

        if (!text || !mood) {
            return res.status(400).json({
                error: "Please provide both text and mood"
            });
        }

        const sentiment = analyzeSentiment(text);

        const newEntry = {
            id: Date.now().toString(),
            text,
            mood: mood || sentiment.mood,
            sentimentScore: sentiment.score,
            createdAt: new Date()
        };

        journalEntries.push(newEntry);

        res.status(201).json({
            success: true,
            data: newEntry
        });

    } catch (error) {
        res.status(500).json({
            error: "Server Error",
            details: error.message
        });
    }
};


// Get All Journal Entries
exports.getUserJournalEntries = (req, res) => {
    res.status(200).json({
        success: true,
        count: journalEntries.length,
        data: journalEntries
    });
};


// Delete Entry
exports.deleteJournalEntry = (req, res) => {
    const { id } = req.params;

    const index = journalEntries.findIndex(entry => entry.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Journal entry not found"
        });
    }

    journalEntries.splice(index, 1);

    res.json({
        success: true,
        message: "Entry deleted"
    });
};


// Mood Insights
exports.getMoodInsights = (req, res) => {

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
};