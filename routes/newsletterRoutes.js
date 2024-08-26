const express = require('express');
const router = express.Router();
const newsletterControllers = require('../controllers/NewsletterControllers');

router.get('/newsletter', newsletterControllers.sendNewOffers);

module.exports = router;