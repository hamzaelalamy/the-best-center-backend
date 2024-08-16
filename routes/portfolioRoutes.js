const express = require('express');
const router = express.Router();
const portfolioControllers = require('../controllers/portfolioControllers.js');
const { uploadPortfolio } = require('../config/uploadPortfolio.js');

router.get('/portfolio', portfolioControllers.getPortfolios);
router.get('/portfolio/:id', portfolioControllers.getPortfolioById);
router.post('/portfolio', uploadPortfolio.single('image'), portfolioControllers.createPortfolio);
router.put('/portfolio/:id', portfolioControllers.updatePortfolio);
router.delete('/portfolio/:id', portfolioControllers.deletePortfolio);

module.exports = router;