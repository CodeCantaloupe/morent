const express = require('express')
const router = express.Router()
const usersValidation = require('../validations/usersValidation')
const usersController = require('../controllers/usersController')
const usersMiddleware = require('../middlewares/usersMiddleware')

router.route('/api/users')
.get(usersController.getUsers)
.post(usersValidation(), usersController.addUser)

router.route('/api/users/:id')
.get(usersController.getSingleUser)
.patch(usersValidation(), usersController.updateUser)
.delete(usersController.deleteUser)

router.route('/login')
.post(usersController.login)

router.route('/register')
.post(usersValidation(), usersController.register)

module.exports = router