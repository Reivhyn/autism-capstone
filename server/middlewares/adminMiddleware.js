const jwt = require("jsonwebtoken");

// Middleware to authenticate JWT tokens
exports.authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).send("Invalid Token");
    }
};

// Middleware for role-based access control
exports.checkAdminRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).send("Insufficient permissions");
        }
        next();
    };
};