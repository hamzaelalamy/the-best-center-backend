const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret_key = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Non autorisé : Aucun token fourni" });
    }

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Non autorisé : Token invalide" });
        }
        req.body.user = decoded;
        next();
    });
};

module.exports = verifyToken;