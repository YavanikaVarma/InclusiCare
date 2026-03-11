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
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Main route
app.get('/', (req, res) => {
  res.send('InclusiCare API running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
