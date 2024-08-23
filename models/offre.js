const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 64
    },
    description: {
        type: String,
        required: true,
        max: 1024
    },
    missions: {
        type: [String],
    },
    location: {
        type: String,
        required: true
    },
    departement: {
        type: String,
        required: true
    },
    contract: {
        type: String,
        required: true
    },
    education: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    Qualifications: {
        type: String,
        required: true
    },

}, { timestamps: true });

const Offre = mongoose.model('Offre', offreSchema);

module.exports = Offre;