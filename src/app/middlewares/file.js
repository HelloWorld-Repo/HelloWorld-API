const fs = require('fs');
const multer = require('multer');
const path = require('path');

const fileFilter = (_req, file, cb) => {
  const newLocal = file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml');
  if (newLocal) {
    cb(null, true);
  } else {
    cb('Insira um arquivo excel', false);
  }
};

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const pathname = path.join(`${__dirname}/../../..`, '/tmp/files/');

    if (!fs.existsSync(pathname)) {
      fs.mkdirSync(pathname, { recursive: true });
    }

    cb(null, pathname);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-hw-${file.originalname}`);
  },
});

module.exports = multer({ storage, fileFilter });
