const express = require('express');
const multer = require('multer');
const Item = require('../models/Item'); // Make sure the path to your Item model is correct
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// GET /api/items - Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/items - Upload a new item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const item = new Item({
      title: req.body.title,
      description: req.body.description,
      image: req.file.path,  // Store the file path
      category: req.body.category,
      bids: [],
    });

    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


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
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
