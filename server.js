// const connectDB = require("./backend/config/db");
// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = 3000;

// // Serve static files from the current directory
// app.use(express.static(path.join(__dirname)));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(PORT, () => {
//     console.log(`InclusiCare Server running at http://localhost:${PORT}`);
//     console.log('Press Ctrl+C to stop.');
// });
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = async () => {
//   console.log("Database connection skipped (development mode)");
// };

// module.exports = connectDB;

// // Load env vars
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Enable CORS
// app.use(cors());

// // Body parser
// app.use(express.json());

// // Main route
// app.get('/', (req, res) => {
//   res.send('InclusiCare API running');
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
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
app.use(express.static(__dirname));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
