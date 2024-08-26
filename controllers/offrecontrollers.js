const Offre = require("../models/offre");

const getOffre = async (req, res) => {
    try {
        const offers = await Offre.find();
        if (!offers) {
            return res.status(404).json({ error: "offer not found" });
        }

        res.status(200).json(offers);
    } catch (error) {
        console.error("Error in getoffers:", error);
        res.status(500).json({ error: error.message });
    }
};

const getOffreById = async (req, res) => {
    try {
        const offre = await Offre.findById(req.params.id);
        if (!offre) {
            return res.status(404).json({ error: "offre not found" });
        }

        res.status(200).json(offre);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({ error: "offre not found" });
        }
        res.status(500).json({ error: error.message });
    }
};

const createOffre = async (req, res) => {
    try {

        const { title, description, responsibilities, location, departement, contract, education, type , Qualifications } = req.body;

        const newOffre = new Offre({
            title,
            description,
            responsibilities,
            location,
            departement,
            contract,
            education,
            type,
            Qualifications
        });

        await newOffre.save();
        res.status(201).json({ success: true, message: "Successfully Offre added", offre: newOffre });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

const putOffre = async (req, res) => {
    try {
        const offre = await Offre.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!offre) {
            return res.status(404).json({ message: "offre not found" });
        }
        res.json({ message: "offre Modified", offre: offre });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteOffre = async (req, res) => {
    try {
        const offre = await Offre.findByIdAndDelete(req.params.id);
        if (!offre) {
            return res.status(404).json({ message: "offre not found" });
        }
        res.json({ message: "offre deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOffre,
    getOffreById,
    createOffre,
    putOffre,
    deleteOffre,
};