const express = require('express');
const router = express.Router();
const postulationControllers = require('../controllers/postulationControllers');

router.post('/application', postulationControllers.createPostulation);
router.get('/application', postulationControllers.getPostulation);
router.get('/application/:id', postulationControllers.getPostulationById);
router.put('/application/:id', postulationControllers.putPostulation);
router.delete('/application/:id', postulationControllers.deletePostulation);

module.exports = router;