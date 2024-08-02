const express = require('express');
const multer = require('multer');
const Item = require('../models/Item'); // Ensure this path is correct

const router = express.Router();

// Set up multer for memory storage to handle image uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/items - Upload a new item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageBase64 = req.file.buffer.toString('base64');

    const newItem = new Item({
      title: req.body.title,
      description: req.body.description,
      image: imageBase64,
      category: req.body.category,
      bids: [],
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ message: 'Error saving item' });
  }
});

// GET /api/items - Get all items, with optional search and category filters
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search on title
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' }; // Case-insensitive search on category
    }

    const items = await Item.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH /api/items/:id - Add a bid to an item
router.patch('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Add the new bid to the bids array
    item.bids.push({
      price: req.body.price,
      email: req.body.email,
      date: new Date(),
    });

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item' });
  }
});

module.exports = router;
