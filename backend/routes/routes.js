const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Material = require('../models/Material');

// POST - Create Material with file upload
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const material = new Material({
      title,
      description,
      type,
      link: filePath,
    });

    await material.save();
    res.status(201).json(material);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file');
  }
});

// PUT - Update Material (optional new file)
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, description, type } = req.body;
    const update = {
      title,
      description,
      type,
    };

    if (req.file) {
      update.link = `/uploads/${req.file.filename}`;
    }

    const material = await Material.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!material) return res.status(404).send('Material not found');
    res.json(material);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating material');
  }
});

// DELETE - Remove material
router.delete('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).send('Material not found');
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting material');
  }
});

// GET - All materials
router.get('/', async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching materials');
  }
});

module.exports = router;
