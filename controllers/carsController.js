const errorHandler = require('../utils/errorHandler')
const {validationResult} = require('express-validator')
const carsModel = require('../models/carsModel')


/*
 * This module handles the HTTP requests related to car management in the application.
 * It provides functionalities to fetch (all or single), add, update, and delete cars from the database.
 */


/**
 * Retrieves all cars from the database.
 *
 * When a GET request is made to the relevant endpoint, this function:
 * - Fetches all car records using the carsModel.
 * - Sends a JSON response containing the list of cars and a success message.
 */
const getCars = async (req, res) => {
    res.status(errorHandler.status.OK).json({
        status: errorHandler.status.OK,
        message: 'Cars fetched successfully',
        object: await carsModel.find(),
    })
}

/**
 * Fetches a single car by its ID.
 *
 * This function handles GET requests for a specific car:
 * - It extracts the car ID from the request parameters.
 * - If the car is found in the database, it responds with the car data.
 * - If not found, it sends a NOT_FOUND error message.
 */
const getSingleCar = async (req, res) => {
    let carId = req.params.id
    let car = await carsModel.findById(carId)

    if (!car) {
        res
        .status(errorHandler.status.NOT_FOUND)
        .json({
            status: errorHandler.status.NOT_FOUND,
            message: "Car not found"
        })
    } else {
        res
        .status(errorHandler.status.OK)
        .json({
            status: errorHandler.status.OK,
            message: 'Car fetched successfully',
            object: car
        })
    }
}

/**
 * Adds a new car to the database.
 *
 * This function is triggered by POST requests:
 * - It checks for validation errors using express-validator.
 * - If there are errors, it sends a BAD_REQUEST response with the errors.
 * - If validation passes, it creates a new car record in the database and responds with a success message.
 */
const addCar = async (req, res) => {
    let newCar = req.body
    let validationErrors = validationResult(req)
    
    try {
        if(!validationErrors.isEmpty()) {
            res
            .status(errorHandler.status.BAD_REQUEST)
            .json({
                status: errorHandler.status.BAD_REQUEST,
                message: validationErrors
            })
        } else {
            await carsModel.create(newCar)

            res
            .status(errorHandler.status.CREATED)
            .json({
                status: errorHandler.status.CREATED,
                message: 'Car added successfully'
            })
        }
    } catch (error) {
        console.log(error);
        res
        .status(errorHandler.status.INTERNAL_SERVER_ERROR)
        .json({
            status: errorHandler.status.INTERNAL_SERVER_ERROR,
            message: error
        })
    }
}


/**
 * Updates an existing car in the database.
 *
 * This function handles PATCH requests:
 * - It extracts the car ID from the request parameters and new data from the body.
 * - It checks for validation errors before attempting the update.
 * - If the car is updated successfully, it sends back a success message.
 * - If not found, it sends a NOT_FOUND error; if there are validation errors, it sends those as well.
 */
const updateCar = async (req, res) => {
    let carId = req.params.id
    let newCar = req.body
    let updatedCar = await carsModel.findByIdAndUpdate(carId, newCar)
    let validationErrors = validationResult(req)

    if (updatedCar && validationErrors.isEmpty()) {
        return res.status(errorHandler.status.OK).json({
            status: errorHandler.status.OK,
            message: `Car ${carId} updated successfully`,
            object: updatedCar
        })
    } else if (!updatedCar) {
        return res.status(errorHandler.status.NOT_FOUND).json({
            status: errorHandler.status.NOT_FOUND,
            message: "Car not found"
        })
    } else if (!validationErrors.isEmpty()) {
        return res.status(errorHandler.status.BAD_REQUEST).json({
            status: errorHandler.status.BAD_REQUEST,
            message: validationErrors
        })
    }
    
}


/**
 * Deletes a car by its ID from the database.
 *
 * This function handles DELETE requests:
 * - It extracts the car ID from the request.
 * - If the car is found and deleted, it sends a success message.
 * - If not found, it sends a NOT_FOUND error message.
 */
const deleteCar = async (req, res) => {
    let carId = req.params.id
    let car = await carsModel.findByIdAndDelete(carId)

    if (car) {
        return res.status(errorHandler.status.OK).json({
            status: errorHandler.status.OK,
            message: `Car ${carId} deleted successfully`
        })
    }
    return res.status(errorHandler.status.NOT_FOUND).json({
        status: errorHandler.status.NOT_FOUND,
        message: "Car not found"
    })
}

module.exports = {
    getCars,
    getSingleCar,
    addCar,
    updateCar,
    deleteCar
}