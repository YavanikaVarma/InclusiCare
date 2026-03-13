const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./backend/config/db");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB().catch(err => {
  console.log("MongoDB not connected, running server without database");
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend"), { index: false }));

// Routes
const journalRoutes = require("./backend/routes/journalRoutes");
app.use("/api/journal", journalRoutes);

// Root route (loads frontend)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "login.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});