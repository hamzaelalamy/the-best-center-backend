const adminAuthMiddleware = (req, res, next) => {
    const user = req.body.user;

    if (!user) {
        return res.status(401).json({ message: 'Non autorisé : Aucun token fourni' });
    }

    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Interdit : Vous n\'êtes pas administrateur' });
    }

    next();
};

module.exports = adminAuthMiddleware;