const mongoose = require('mongoose');

const postulationSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    offre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    cv: {
        type: String,
        // required: true
    },
    socials: {
        type: String,
    },
    cover: {
        type: String
    },

}, { timestamps: true });

const Postulation = mongoose.model('Postulation', postulationSchema);

module.exports = Postulation;