import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Car from "../models/Car.js";

// Generate JWT token
const generateToken = (userId) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// ================= REGISTER USER =================
export const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        // Check existing user
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            image: ""
        });

        // Generate token
        const token = generateToken(user._id.toString());

        res.status(201).json({
            success: true,
            token
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= LOGIN USER =================
export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = generateToken(user._id.toString());

        res.status(200).json({
            success: true,
            token
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= GET USER DATA =================
export const getUserData = async (req, res) => {

    try {

        const { _id } = req.user;

        const user = await User.findById(_id).select("-password");

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= GET ALL CARS =================
export const getCars = async (req, res) => {

    try {

        const cars = await Car.find({
            isAvailable: true
        });

        res.status(200).json({
            success: true,
            cars
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};