const express = require('express')
const router = express.Router()
const carsController = require('../controllers/carsController')
const carsValidation = require('../validations/carsValidation')
const carsMiddleware = require('../middlewares/carsMiddleware')

router.route('/cars')
.get(carsController.getCars)
.post(carsValidation(), carsController.addCar)

router.route('/cars/:id')
.get(carsController.getSingleCar)
.patch(carsValidation(), carsController.updateCar)
.delete(carsController.deleteCar)

module.exports = router