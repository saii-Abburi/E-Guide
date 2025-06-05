const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // save files to /uploads directory
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".pdf", ".doc", ".docx", ".ppt", ".pptx", ".txt"].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only document files are allowed!"));
    }
  },
});

module.exports = upload;
