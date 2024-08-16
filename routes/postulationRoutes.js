const express = require('express');
const multer = require('multer');
const { uploadpostulation } = require('../config/uploadpostulation');
const router = express.Router();
const postulationControllers = require('../controllers/postulationControllers');
const { uploadCv } = require('../config/uploadCv');
const upload = require('multer')();

router.post('/application', upload.any(), postulationControllers.createPostulation);
router.get('/application', postulationControllers.getPostulation);
router.get('/application/:id', postulationControllers.getPostulationById);
router.put('/application/:id', postulationControllers.putPostulation);
router.delete('/application/:id', postulationControllers.deletePostulation);

module.exports = router;