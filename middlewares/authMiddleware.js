const { verifyToken } = require('../utils/tokenHandler');

exports.authMiddleware = (req, res, next) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const username = verifyToken(token);
        if (!username) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = username;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
