const express = require('express')
const router = express.Router()
const carsController = require('../controllers/carsController')
const carsValidation = require('../validations/carsValidation')

router.route('/cars')
.get(carsController.getCars)
.post(carsValidation, carsController.addCar)
.patch(carsController.updateCar)
.delete(carsController.deleteCar)

module.exports = router