const express = require("express");
const offreControllers = require("../controllers/offrecontrollers");
const offreRoute = express.Router();
offreRoute.use(express.json());

offreRoute.get('/offre', offreControllers.getOffre);
offreRoute.get('/offre/:id', offreControllers.getOffreById);
offreRoute.post('/offre', offreControllers.createOffre);
offreRoute.put('/offre/:id', offreControllers.putOffre);
offreRoute.delete('/offre/:id', offreControllers.deleteOffre);

module.exports = offreRoute;