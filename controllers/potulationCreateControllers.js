const Postulation = require('../models/Postulation');
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.createPostulation = async (req, res) => {
  try {
    const { nom, prenom, email, offre, phone, socials, cover, cvUrl } = req.body;

    let cvLink = '';

    // If a file is uploaded, upload it to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "postulation",
      });
      cvLink = result.secure_url;
    } else if (cvUrl) {
      // If a Google Drive URL is provided
      cvLink = cvUrl;
    } else {
      return res.status(400).send({ error: "Postulation cv is required" });
    }

    // Create an object with only the required fields
    const postulationData = {
      nom,
      prenom,
      email,
      offre,
      cv: cvLink,
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
