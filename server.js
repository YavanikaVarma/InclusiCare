/*
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Import DB connection
const connectDB = require('./backend/config/db');

// Import routes
const journalRoutes = require('./backend/routes/journalRoutes');

// Connect database (currently dummy function)
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/journal', journalRoutes);

// Serve frontend files
// app.use(express.static(__dirname));

// // Default route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'frontend','index.html'));
// });
console.log(path.join(__dirname, "/frontend"));
// Serve static files from the current directory
app.use(express.static(path.join(__dirname, "/frontend")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/login.html"));
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./backend/config/db");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

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