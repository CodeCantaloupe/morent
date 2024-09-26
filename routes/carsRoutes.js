const express = require('express')
const router = express.Router()
const carsController = require('../controllers/carsController')
const carsValidation = require('../validations/carsValidation')
const usersMiddleware = require('../middlewares/usersMiddleware')

router.route('/cars')
.get(carsController.getCars)
.post(usersMiddleware, carsValidation(), carsController.addCar)

router.route('/cars/:id')
.get(carsController.getSingleCar)
.patch(usersMiddleware, carsValidation(), carsController.updateCar)
.delete(usersMiddleware, carsController.deleteCar)

module.exports = router