const Portfolio = require("../models/portfolio");
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

const getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    if (!portfolios || portfolios.length === 0) {
      return res.status(404).json({ message: "No portfolio is found" });
    }

    res.status(200).json(portfolios);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

const getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "No portfolio is found" });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

const createPortfolio = async (req, res) => {
  try {
    const { title, subtitle, description, category } = req.body;
    if (!req.file) {
      return res.status(400).send({ error: "Portfolio image is required" });
    }
    if (!title || !subtitle || !description || !category) {
      return res
        .status(400)
        .json({ message: "Please provide all portfolio details" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolios",
    });

    const portfolio = new Portfolio({
      title,
      subtitle,
      description,
      category,
      image: result.secure_url, // Store the URL of the image
    });

    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log(`Error: ${error}`);
      return res.status(400).json({ error: error.message });
    } else {
      console.log(`Error: ${error}`);
      res.status(500).json({ error: error.message });
    }
  }
};

const updatePortfolio = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Please provide portfolio ID" });
    }

    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

const deletePortfolio = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Please provide portfolio ID" });
    }

    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Extract public ID from URL to delete the image
    const publicId = portfolio.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`portfolios/${publicId}`);

    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};