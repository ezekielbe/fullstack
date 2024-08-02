const express = require('express');
const multer = require('multer');
const Item = require('../models/Item');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ message: 'Error saving item' });
  }
});

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

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { price, email } = req.body;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.bids.push({ price, email });
    await item.save();

    res.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item' });
  }
});

module.exports = router;
