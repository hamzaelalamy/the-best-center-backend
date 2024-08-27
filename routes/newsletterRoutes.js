const express = require('express');
const router = express.Router();
const newsletterControllers = require('../controllers/newsletterControllers');

router.get('/newsletter', newsletterControllers.sendNewOffers);

module.exports = router;
