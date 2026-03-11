const express = require("express");
const router = express.Router();

const {
  createJournalEntry,
  getUserJournalEntries,
  deleteJournalEntry,
  getMoodInsights
} = require("../controllers/journalController");

router.post("/", createJournalEntry);
router.get("/", getUserJournalEntries);
router.delete("/:id", deleteJournalEntry);
router.get("/insights", getMoodInsights);

module.exports = router;