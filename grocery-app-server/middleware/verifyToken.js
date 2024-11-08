const jwt = require('jsonwebtoken'); // Ensure jwt is imported

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization'); 
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key'); // Verify the token
        req.user = decoded; // Attach user information to the request object
        next(); // Move to the next middleware/route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = {verifyToken};
