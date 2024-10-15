const jwt = require('jsonwebtoken');

// Middleware to check if user is authenticated


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from header

    if (token == null) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user; 
        next();
    });
};

module.exports = authenticateToken;