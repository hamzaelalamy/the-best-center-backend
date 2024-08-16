const express = require("express");
const multer = require('multer');
const {uploadactualites} = require('../config/uploadactualites');
const actualiteControllers = require("../controllers/actualitecontrollers");
const actualiteRoute = express.Router();
actualiteRoute.use(express.json());

actualiteRoute.get('/actualite', actualiteControllers.getActualites);
actualiteRoute.get('/actualite/:id', actualiteControllers.getActualitesById);
actualiteRoute.post('/actualite', uploadactualites.single('image'), actualiteControllers.createActualites);
actualiteRoute.put('/actualite/:id', actualiteControllers.putActualites);
actualiteRoute.delete('/actualite/:id', actualiteControllers.deleteActualites);

module.exports = actualiteRoute;