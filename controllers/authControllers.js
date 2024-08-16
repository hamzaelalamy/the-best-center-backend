const Admin = require('../models/admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await
            Admin
                .findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = {
            admin: {
                id: admin.id,
                role: admin.role
            }
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ message: "Login successful", token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}