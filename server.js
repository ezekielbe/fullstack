const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); 
const itemRoutes = require('./routes/items');

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

// Use item routes
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
