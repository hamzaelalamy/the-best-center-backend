const Postulation = require('../models/postulation');
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

        const { nom, prenom, cv, phone, email, offre } = req.body;

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "postulation",
        });

        console.log(result);


        const newPostulation = new Postulation({
            nom,
            prenom,
            cv,
            phone,
            email,
            offre,
            cv: result.secure_url
        });
        await newPostulation.save();
        res
            .status(201)
            .json({
                success: true,
                message: "Successfully Postulation added",
                actualite: newPostulation,
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

exports.getUrlfile = async (req, res) => {
    const { fileId } = req.params;
    const fileUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

    try {
        const response = await axios.get(fileUrl, {
            responseType: 'arraybuffer',
        });

        res.set('Content-Type', response.headers['content-type']);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching file from Google Drive:', error);
        res.status(500).send('Failed to fetch file from Google Drive');
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