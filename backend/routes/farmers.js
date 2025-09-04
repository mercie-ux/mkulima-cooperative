const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');

// GET all farmers
router.get('/', async (req, res) => {
  try {
    const farmers = await Farmer.findAll();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch farmers', error: err.message });
  }
});

// POST new farmer
router.post('/', async (req, res) => {
  try {
    const farmer = await Farmer.create(req.body);
    res.status(201).json(farmer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add farmer', error: err.message });
  }
});

// PUT update farmer
router.put('/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findByPk(req.params.id);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    await farmer.update(req.body);
    res.json(farmer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update farmer', error: err.message });
  }
});

// DELETE farmer
router.delete('/:id', async (req, res) => {
  try {
    const farmer = await Farmer.findByPk(req.params.id);
    if (!farmer) return res.status(404).json({ message: 'Farmer not found' });

    await farmer.destroy();
    res.json({ message: 'Farmer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete farmer', error: err.message });
  }
});

module.exports = router;
