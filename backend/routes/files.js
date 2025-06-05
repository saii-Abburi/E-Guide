const express = require('express');
const router = express.Router();
const mime = require('mime-types');
const path = require('path');

// View file inline
router.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
  res.setHeader('Content-Disposition', 'inline');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

// Download file with original MIME
router.get('/download/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
  const mimeType = mime.lookup(filePath) || 'application/octet-stream';
  res.setHeader('Content-Type', mimeType);
  res.download(filePath, req.params.filename, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('Error downloading file');
    }
  });
});

module.exports = router;
