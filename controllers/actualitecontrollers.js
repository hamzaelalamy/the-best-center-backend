const Actualites = require("../models/actualites");
const fs = require("fs").promises;
const path = require("path");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getActualites = async (req, res) => {
  try {
    const actualites = await Actualites.find();
    if (!actualites) {
      return res.status(404).json({ error: "Actualites not found" });
    }

    res.status(200).json(actualites); // Return the actualites directly as they now contain the URL
  } catch (error) {
    console.error("Error in getActualites:", error);
    res.status(500).json({ error: error.message });
  }
};

const getActualitesById = async (req, res) => {
  try {
    const actualite = await Actualites.findById(req.params.id);
    if (!actualite) {
      return res.status(404).json({ error: "Actualites not found" });
    }

    res.status(200).json(actualite); // Return the actualite directly as it now contains the URL
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(404).json({ error: "Actualites not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

const createActualites = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: "Actualites image is required" });
    }

    const { title, description, category, eventDate } = req.body;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "actualites",
    });

    const newActualites = new Actualites({
      title,
      description,
      category,
      eventDate,
      image: result.secure_url
    });
    await newActualites.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Successfully Actualites added",
        actualite: newActualites,
      });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const putActualites = async (req, res) => {
  try {
    const actualites = await Actualites.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!actualites) {
      return res.status(404).json({ message: "Actualités not found" });
    }
    res.json({ message: "Actualités Modified", actualite: actualites });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteActualites = async (req, res) => {
  try {
    const actualites = await Actualites.findByIdAndDelete(req.params.id);
    if (!actualites) {
      return res.status(404).json({ message: "Actualites not found" });
    }

    // Extract public ID from URL to delete the image
    const publicId = actualites.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`actualites/${publicId}`);

    res.json({ message: "Actualites deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActualites,
  getActualitesById,
  createActualites,
  putActualites,
  deleteActualites,
};