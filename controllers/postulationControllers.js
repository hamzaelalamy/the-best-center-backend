const Postulation = require('../models/Postulation');
const cloudinary = require("cloudinary").v2;

const CLOUDINARY_CLOUD_NAME = "drqovuycp";
const CLOUDINARY_API_KEY = "327936142615247";
const CLOUDINARY_API_SECRET = "BsOlTM1rR48wUP5eCg_j_OdYrnE";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

exports.createPostulation = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "Postulation cv is required" });
        }

        const { nom, prenom, email, offre, phone, socials, cover } = req.body;

        // Upload CV to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "postulation",
        });

        // Create an object with only the required fields
        const postulationData = {
            nom,
            prenom,
            email,
            offre,
            cv: result.secure_url
        };

        // Add optional fields if they are provided
        if (phone) postulationData.phone = phone;
        if (socials) postulationData.socials = socials;
        if (cover) postulationData.cover = cover;

        const newPostulation = new Postulation(postulationData);
        await newPostulation.save();

        res.status(201).json({
            success: true,
            message: "Postulation Successfully added",
            postulation: newPostulation,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.getPostulation = async (req, res) => {
    try {
        const postulations = await Postulation.find();
        if (!postulations || postulations.length === 0) {
            return res.status(404).json({ error: "Postulations not found" });
        }
        res.status(200).json(postulations);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.getPostulationById = async (req, res) => {
    try {
        const postulation = await Postulation.findById(req.params.id);
        if (!postulation) {
            return res.status(404).json({ error: "Postulation not found" });
        }
        res.status(200).json(postulation);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

exports.putPostulation = async (req, res) => {
    try {
        const postulation = await Postulation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!postulation) {
            return res.status(404).json({ error: "Postulation not found" });
        }
        res.status(200).json(postulation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deletePostulation = async (req, res) => {
    try {
        const postulation = await Postulation.findByIdAndDelete(req.params.id);
        if (!postulation) {
            return res.status(404).json({ error: "Postulation not found" });
        }
        res.status(200).json({ message: "Postulation deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};