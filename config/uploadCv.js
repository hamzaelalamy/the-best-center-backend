const multer = require("multer");
const fs = require("fs");
const path = require("path");

const portfolioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join("uploads", "portfolios");
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const uploadPortfolio = multer({ storage: portfolioStorage });

module.exports = { uploadPortfolio };