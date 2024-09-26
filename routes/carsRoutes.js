const express = require('express')
const router = express.Router()
const carsController = require('../controllers/carsController')
const carsValidation = require('../validations/carsValidation')
const carsMiddleware = require('../middlewares/carsMiddleware')

router.route('/cars')
.get(carsController.getCars)
.post(carsMiddleware, carsValidation(), carsController.addCar)
.patch(carsMiddleware, carsController.updateCar)
.delete(carsMiddleware, carsController.deleteCar)

module.exports = router