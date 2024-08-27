const Postulation = require('../models/postulation');
const { google } = require('googleapis');
const dotenv = require("dotenv");
dotenv.config();

// Function to dynamically generate redirect URL based on jobId
function generateRedirectUri(jobId) {
    return `http://localhost:9000/jobs/${jobId}/apply`;
}

// Initialize Google OAuth2 client with a dynamic redirect URI
function createOAuth2Client(redirectUri) {
    const oAuth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectUri
    );

    // Set the refresh token from the environment variable
    oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    return oAuth2Client;
}

// Function to set file permissions on Google Drive
async function setFilePublic(oAuth2Client, fileId) {
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        const file = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });

        console.log('File is now public. View link:', file.data.webViewLink);
        return file.data.webViewLink;
    } catch (error) {
        console.error('Error setting file permissions:', error);
        throw new Error('Failed to set file permissions on Google Drive');
    }
}

// Get all Postulations
exports.getPostulation = async (req, res) => {
    try {
        const { page, limit } = req.query;
        if (page && limit) {
            const postulations = await Postulation.find().limit(limit).skip((page - 1) * 10);
            if (!postulations || postulations.length === 0) {
                return res.status(404).json({ error: "Postulations not found" });
            }
            return res.status(200).json(postulations);
        }
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

// Get a single Postulation by ID
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

// Update a postulation by ID
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

// Delete a postulation by ID
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
}
