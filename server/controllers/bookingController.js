import Booking from '../models/Booking.js';
import Car from '../models/Car.js';

// ================= CHECK AVAILABILITY FUNCTION =================
const checkAvailability = async (carId, pickupDate, returnDate) => {

    const bookings = await Booking.find({
        car: carId,
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate },
    });

    return bookings.length === 0;
};

// ================= CHECK AVAILABLE CARS =================
export const checkAvailabilityOfCar = async (req, res) => {

    try {

        const { location, pickupDate, returnDate } = req.body;

        // Get cars by location
        const cars = await Car.find({
            location: {
                $regex: location,
                $options: "i"
            },
            isAvailable: true
        });

        // Check booking availability
        const availableCarsPromises = cars.map(async (car) => {

            const available = await checkAvailability(
                car._id,
                pickupDate,
                returnDate
            );

            return available ? car : null;
        });

        const availableCarsData = await Promise.all(
            availableCarsPromises
        );

        const availableCars = availableCarsData.filter(
            (car) => car !== null
        );

        res.status(200).json({
            success: true,
            availableCars
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
export const getAllCars = async (req, res) => {

    try {

        const cars = await Car.find({
            isAvailable: true
        });

        console.log(cars);
        console.log("TOTAL CARS:", cars.length);

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

// ================= CREATE BOOKING =================
export const createBooking = async (req, res) => {

    try {

        const { _id } = req.user;

        const { carId, pickupDate, returnDate } = req.body;

        const available = await checkAvailability(
            carId,
            pickupDate,
            returnDate
        );

        if (!available) {

            return res.status(400).json({
                success: false,
                message: "Car is not available for selected dates"
            });
        }

        const carData = await Car.findById(carId);

        if (!carData) {

            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);

        const noOfDays = Math.ceil(
            (returned - picked) / (1000 * 3600 * 24)
        );

        const price = carData.pricePerDay * noOfDays;

        const booking = await Booking.create({
            car: carId,
            owner: carData.owner,
            user: _id,
            pickupDate,
            returnDate,
            price
        });

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= USER BOOKINGS =================
export const getUserBookings = async (req, res) => {

    try {

        const { _id } = req.user;

        const bookings = await Booking.find({
            user: _id
        })
        .populate('car')
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= OWNER BOOKINGS =================
export const getOwnerBookings = async (req, res) => {

    try {

        if (req.user.role !== "owner") {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const bookings = await Booking.find({
            owner: req.user._id
        })
        .populate('car user')
        .select("-user.password")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bookings
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= CHANGE BOOKING STATUS =================
export const changeBookingStatus = async (req, res) => {

    try {

        const { _id } = req.user;

        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId);

        if (!booking) {

            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Owner check
        if (booking.owner.toString() !== _id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        booking.status = status.toLowerCase();

        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            booking
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};