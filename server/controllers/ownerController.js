import User from '../models/User.js';
import Car from '../models/Car.js';
import imagekit from '../configs/imageKit.js';
import Booking from '../models/Booking.js';
import fs from "fs";

// ==============================
// CHANGE ROLE TO OWNER
// ==============================
export const changeRoleToOwner = async (req, res) => {
    try {

        const { _id } = req.user;

        await User.findByIdAndUpdate(_id, {
            role: "owner"
        });

        res.json({
            success: true,
            message: "Now you can list cars"
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==============================
// ADD CAR
// ==============================
export const addCar = async (req, res) => {

    try {

        const { _id } = req.user;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const carData = JSON.parse(req.body.carData);

        const fileBuffer = fs.readFileSync(req.file.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: req.file.originalname,
            folder: "/cars"
        });

        fs.unlinkSync(req.file.path);

        const imageUrl = response.url;

        await Car.create({
            owner: _id,
            brand: carData.brand,
            model: carData.model,
            image: imageUrl,
            year: carData.year,
            category: carData.category,
            SittingCapacity: carData.SittingCapacity,
            fuel_type: carData.fuel_type,
            transmission: carData.transmission,
            pricePerDay: carData.pricePerDay,
            location: carData.location,
            description: carData.description,
            isAvailable: true
        });

        res.json({
            success: true,
            message: "Car added successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==============================
// GET OWNER CARS
// ==============================
export const getOwnerCars = async (req, res) => {

    try {

        const cars = await Car.find({
            owner: req.user._id
        });

        res.json({
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


// ==============================
// GET ALL CARS
// ==============================
export const getAllCars = async (req, res) => {

    try {

        const cars = await Car.find({
            isAvailable: true
        });

        res.json({
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


// ==============================
// TOGGLE CAR
// ==============================
export const toggleCarAvailability = async (req, res) => {

    try {

        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const { carId } = req.body;

        if (!carId) {
            return res.status(400).json({
                success: false,
                message: "Car ID missing"
            });
        }

        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        // OWNER CHECK
        if (car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // TOGGLE
        car.isAvailable = !car.isAvailable;

        await car.save();

        res.json({
            success: true,
            message: "Car availability updated",
            car
        });

    } catch (error) {

        console.log("TOGGLE ERROR:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==============================
// DELETE CAR
// ==============================
export const deleteCar = async (req, res) => {

    try {

        const { carId } = req.body;

        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        if (car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await Car.findByIdAndDelete(carId);

        res.json({
            success: true,
            message: "Car deleted successfully"
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==============================
// DASHBOARD
// ==============================
export const getDashboardData = async (req, res) => {

    try {

        const cars = await Car.find({
            owner: req.user._id
        });

        const bookings = await Booking.find({
            owner: req.user._id
        }).populate("car");

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: bookings.filter(
                b => b.status === "pending"
            ).length,
            completedBookings: bookings.filter(
                b => b.status === "confirmed"
            ).length,
            recentBookings: bookings.slice(0, 3),
            monthlyRevenue: bookings.reduce(
                (acc, item) => acc + item.price,
                0
            )
        };

        res.json({
            success: true,
            dashboardData
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==============================
// UPDATE USER IMAGE
// ==============================
export const updateUserImage = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const fileBuffer = fs.readFileSync(req.file.path);

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: req.file.originalname,
            folder: "/users"
        });

        fs.unlinkSync(req.file.path);

        const imageUrl = response.url;

        await User.findByIdAndUpdate(req.user._id, {
            image: imageUrl
        });

        res.json({
            success: true,
            message: "Image updated successfully",
            image: imageUrl
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};