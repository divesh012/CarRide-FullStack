import express from 'express';

import {
    changeRoleToOwner,
    addCar,
    getOwnerCars,
    toggleCarAvailability,
    deleteCar,
    getDashboardData,
    updateUserImage
} from '../controllers/ownerController.js';

import protect from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

// Change role
ownerRouter.post("/change-role", protect, changeRoleToOwner);

// Add car
ownerRouter.post(
    "/add-car",
    protect,
    upload.single('image'),
    addCar
);

// Get owner cars
ownerRouter.get("/cars", protect, getOwnerCars);

// Toggle car availability
ownerRouter.post(
    "/toggle-car",
    protect,
    toggleCarAvailability
);

// Delete car
ownerRouter.post(
    "/delete-car",
    protect,
    deleteCar
);

// Dashboard
ownerRouter.get(
    "/dashboard-data",
    protect,
    getDashboardData
);

// Update image
ownerRouter.post(
    "/update-image",
    protect,
    upload.single("image"),
    updateUserImage
);

export default ownerRouter;