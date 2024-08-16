const Postulation = require('../models/Postulation');
const cloudinary = require('../config/cloudinary');

exports.createPostulation = async (req, res) => {
    console.log("data ", req.body);
    console.log("file ", req.file);
    try {
        if (!req.file) {
            return res.status(400).send({ error: "Image is required" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "postulation",
        });

        const postulation = new Postulation({
            ...req.body,
            image: result.secure_url,
        });
        const savedPostulation = await postulation.save();

        fs.unlinkSync(req.file.path);

        res.status(201).json(savedPostulation);
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        } else if (error.http_code) {
            return res.status(error.http_code).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: "An unexpected error occurred" });
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