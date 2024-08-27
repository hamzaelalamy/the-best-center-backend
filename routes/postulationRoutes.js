const express = require('express');
const multer = require('multer');
const { uploadpostulation } = require('../config/uploadpostulation');
const router = express.Router();

// Import the separated controllers
const PostulationCreateController = require('../controllers/potulationCreateControllers');
const PostulationControllers = require('../controllers/postulationControllers');

// POST route for creating a new postulation
router.post('/application', uploadpostulation.single('cv'), PostulationCreateController.createPostulation);

// GET routes for retrieving postulations
router.get('/application', PostulationControllers.getPostulation);
router.get('/application/:id', PostulationControllers.getPostulationById);

// PUT route for updating a postulation
router.put('/application/:id', PostulationControllers.putPostulation);

// DELETE route for deleting a postulation
router.delete('/application/:id', PostulationControllers.deletePostulation);

module.exports = router;
