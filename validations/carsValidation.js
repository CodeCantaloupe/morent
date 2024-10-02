const carsModel = require('../models/carsModel')
const { body } = require('express-validator');

const carsValidation = () => {
    return [
        body('carName')
        .notEmpty()
        .withMessage('Car name is required')
        .isLength({min: 3})
        .withMessage('Car name must not be less than 3 characters')
        .custom(async (carName, {req}) => {
            const existingCar = await carsModel.findOne({carName})
            if(existingCar && existingCar._id != req.params.id) {
                console.log('Car name already exists')
                throw new Error('Car name already exists')
            }
        }),

        body("carPrice")
        .notEmpty()
        .withMessage('Car price is required'),

        body("carImage")
        .notEmpty()
        .withMessage('Car image is required')
        .custom(async (carImage, {req}) => {
            const existingCar = await carsModel.findOne({carImage})
            if(existingCar && existingCar._id != req.params.id) {
                console.log('Car image already exists')
                throw new Error('Car image already exists')
            }
        }),

        body("carType")
        .notEmpty()
        .withMessage('Car type is required'),

        body("carSeats")
        .notEmpty()
        .withMessage('Car seats is required'),

        body("carFuelCapacity")
        .notEmpty()
        .withMessage('Car fuel capicity is required'),

        body("carDriveType")
        .notEmpty()
        .withMessage('Car drive type is required'),
    ]
}

module.exports = carsValidation