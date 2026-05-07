import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Remove "Bearer "
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        // Verify token (IMPORTANT)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from DB
        req.user = await User.findById(decoded.id).select('-password');

        next();

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default protect;