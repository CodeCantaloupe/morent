const express = require('express')
const router = express.Router()
const usersValidation = require('../validations/usersValidation')
const usersController = require('../controllers/usersController')
const usersMiddleware = require('../middlewares/usersMiddleware')

router.route('/api/users')
.get(usersMiddleware, usersController.getUsers)
.post(usersMiddleware,usersValidation(), usersController.addUser)

router.route('/api/users/:id')
.get(usersController.getSingleUser)
.patch(usersMiddleware, usersValidation(), usersController.updateUser)
.delete(usersMiddleware, usersController.deleteUser)

router.route('/login')
.post(usersController.login)

router.route('/register')
.post(usersValidation(), usersController.register)

module.exports = router