const express = require("express");
const router = express.Router();
const Crop = require("../models/Crop");

// GET crops (all if admin, else filter by farmerId)
router.get("/", async (req, res) => {
  try {
    const { farmerId } = req.query;
    const where = farmerId ? { farmerId } : {};
    const crops = await Crop.findAll({ where, order: [["createdAt", "DESC"]] });
    res.json(crops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch crops" });
  }
});

// POST add new crop
router.post("/", async (req, res) => {
  try {
    const crop = await Crop.create(req.body);
    res.status(201).json(crop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add crop" });
  }
});

// PUT update crop
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findByPk(id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    await crop.update(req.body);
    res.json(crop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update crop" });
  }
});

// DELETE crop
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findByPk(id);
    if (!crop) return res.status(404).json({ message: "Crop not found" });

    await crop.destroy();
    res.json({ message: "Crop deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete crop" });
  }
});

module.exports = router;
