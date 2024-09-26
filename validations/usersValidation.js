const {body} = require('express-validator')
const usersModel = require('../models/usersModel')

const usersValidation = () => {
    return [
        body('userFirstName')
        .notEmpty()
        .withMessage('User first name is required'),

        body('userLastName')
        .notEmpty()
        .withMessage('User last name is required'),

        body('userName')
        .notEmpty()
        .withMessage('User name is required')
        .custom(async (username, {req}) => {
            let existingUser = await usersModel.findOne({userName: username})
            if(existingUser && req.params.id != existingUser._id) {
                console.log('User name already exists')
                throw new Error('User name already exists')
            }
        }),

        body('userEmail')
        .notEmpty()
        .withMessage('User email is required')
        .isEmail()
        .withMessage('User email is invalid')
        .custom(async (userEmail, {req}) => {
            let existingUser = await usersModel.findOne({userEmail: userEmail})
            if(existingUser && req.params.id != existingUser._id) {
                console.log('User email already exists')
                throw new Error('User email already exists')
            }
        }),

        body('userPassword')
        .notEmpty()
        .withMessage('User password is required')
        .isLength({min: 6})
        .withMessage('User password must be at least 6 characters long')
        .matches(/[!@#$%^&*]/)
        .withMessage('User password must contain at least one special character'),

        body('userAddress')
        .notEmpty()
        .withMessage('User address is required'),

        body('userProfileImage')
        .notEmpty()
        .withMessage('User profile image is required'),

        body('userRole')
        .notEmpty()
        .withMessage('User role is required'),

        body('userStatus')
        .notEmpty()
        .withMessage('User status is required'),
    ]
}

module.exports = usersValidation