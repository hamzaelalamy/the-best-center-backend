const Admin = require("../models/admin");
const fs = require('fs').promises;
const path = require('path');

const getAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();
        if (!admins) {
            return res.status(404).json({ error: "Admin not found" });
        }

        res.status(200).json(admins);
    } catch (error) {
        console.error("Error in getActualites:", error);
        res.status(500).json({ error: error.message });
    }
};

const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: "admin not found" });
        }

        res.status(200).json(admin);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({ error: "admin not found" });
        }
        res.status(500).json({ error: error.message });
    }
};

const createAdmin = async (req, res) => {
    try {

        const { fullname, email, password, eventDate } = req.body;

        const newAdmin = new Admin({
            fullname,
            email,
            password,
        });

        await newAdmin.save();
        res.status(201).json({ success: true, message: "Successfully Admin added", admin: newAdmin });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

const putAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }
        res.json({ message: "admin Modified", admin: admin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }
        res.json({ message: "admin deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAdmin,
    getAdminById,
    createAdmin,
    putAdmin,
    deleteAdmin,
};