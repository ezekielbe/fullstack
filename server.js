const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const itemRoutes = require('./routes/items'); // Ensure this path is correct

const app = express();

// Connect to the database
connectDB();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Use item routes for API
app.use('/api/items', itemRoutes);

// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
