const multer = require("multer");
const fs = require("fs");
const path = require("path");

const cvStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join("uploads", "cv");
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const uploadCv = multer({ storage: cvStorage });

module.exports = { uploadCv };