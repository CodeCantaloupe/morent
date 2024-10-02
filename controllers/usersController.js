const usersModel = require('../models/usersModel')
const { validationResult } = require('express-validator')
const errorHandler = require('../utils/errorHandler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const register = async (req, res) => {
    try {
        let newUserData = req.body
        let validationErrors = validationResult(req)

        if (!validationErrors.isEmpty()) {
            return res.status(errorHandler.status.BAD_REQUEST).json({
                status: errorHandler.status.BAD_REQUEST,
                message: validationErrors
            })

        } else if (await usersModel.findOne({ userEmail: newUserData.userEmail })) {
            return res.status(errorHandler.status.BAD_REQUEST).json({
                status: errorHandler.status.BAD_REQUEST,
                message: "User already exists"
            })
        } else if (await usersModel.findOne({ userName: newUserData.userName })) {
            return res.status(errorHandler.status.BAD_REQUEST).json({
                status: errorHandler.status.BAD_REQUEST,
                message: "User already exists"
            })
        }

        let hashedPassword = await bcrypt.hash(newUserData.userPassword, saltRounds)
        let newUser = await usersModel.create({ ...newUserData, userPassword: hashedPassword })

        return res.status(errorHandler.status.CREATED).json({
            status: errorHandler.status.CREATED,
            message: "New user registered successfully",
            object: newUser,
        })
    } catch (error) {
        res.status(errorHandler.status.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

const login = async (req, res) => {
    try {
        let userCredentials = req.body
        let getUser = await usersModel.findOne({ userEmail: userCredentials.userEmail })

        if (!getUser) {
            return res.status(errorHandler.status.NOT_FOUND).json({
                status: errorHandler.status.NOT_FOUND,
                message: "User not found"
            })
        } else if (!bcrypt.compareSync(userCredentials.userPassword, getUser.userPassword)) {
            return res.status(errorHandler.status.UNAUTHORIZED).json({
                status: errorHandler.status.UNAUTHORIZED,
                message: "Incorrect password"
            })
        } else {
            let token = jwt.sign(payload = { userId: getUser._id, userRole: getUser.userRole }, process.env.TOKEN_SECRET)

            return res
                .cookie('jwt_token', token, { httpOnly: true, sameSite: 'lax' })
                .status(errorHandler.status.OK)
                .json({
                    status: errorHandler.status.OK,
                    message: "User logged in successfully",
                    token: token
                })
        }
    } catch (error) {
        console.log(error);
        res
            .status(errorHandler.status.INTERNAL_SERVER_ERROR)
            .json({ message: error })
    }
}

const getUsers = async (req, res) => {
    res.status(errorHandler.status.OK).json({
        status: errorHandler.status.OK,
        message: "Users fetched successfully",
        object: await usersModel.find(),
    })
}

const getSingleUser = async (req, res) => {
    let userId = req.params.id
    let getUser = await usersModel.findById(userId)

    if (!getUser) {
        res
            .status(errorHandler.status.NOT_FOUND)
            .json({
                status: errorHandler.status.NOT_FOUND,
                message: "User not found"
            })
    } else {
        res
            .status(errorHandler.status.OK)
            .json({
                status: errorHandler.status.OK,
                message: "User fetched successfully",
                object: getUser
            })
    }
}

const addUser = async (req, res) => {
    let newUser = req.body
    let validationErrors = validationResult(req)
    try {
        if (!validationErrors.isEmpty()) {
            res
                .status(errorHandler.status.BAD_REQUEST)
                .json({
                    status: errorHandler.status.BAD_REQUEST,
                    message: validationErrors
                })
        } else if (usersModel.findOne({ userEmail: newUser.userEmail })) {
            res
                .status(errorHandler.status.BAD_REQUEST)
                .json({
                    status: errorHandler.status.BAD_REQUEST,
                    message: "User already exists"
                })
        } else if (usersModel.findOne({ userName: newUser.userName })) {
            res
                .status(errorHandler.status.BAD_REQUEST)
                .json({
                    status: errorHandler.status.BAD_REQUEST,
                    message: "User already exists"
                })
        } else {
            await usersModel.create(newUser)
            res
                .status(errorHandler.status.CREATED)
                .json({
                    status: errorHandler.status.CREATED,
                    message: "User added successfully",
                    object: newUser
                })
        }
    } catch (error) {
        return reportInternalError(res, error)
    }

}

const updateUser = async (req, res) => {
    let userId = req.params.id
    let updatedUser = req.body

    try {
        if (!usersModel.findById(userId)) {
            return res
                .status(errorHandler.status.NOT_FOUND)
                .json({
                    status: errorHandler.status.NOT_FOUND,
                    message: "User not found"
                })
        } else {
            return usersModel
                .findByIdAndUpdate(userId, updatedUser)
                .then((updatedUser) => {
                    res
                        .status(errorHandler.status.OK)
                        .json({
                            status: errorHandler.status.OK,
                            message: "User updated successfully",
                            object: updatedUser
                        })
                })
        }
    } catch (error) {
        return reportInternalError(res, error)
    }
}

const deleteUser = async (req, res) => {
    let userId = req.params.id

    try {
        if (!await usersModel.findById(userId)) {
            res
                .status(errorHandler.status.NOT_FOUND)
                .json({
                    status: errorHandler.status.NOT_FOUND,
                    message: "User not found"
                })
        } else {
            usersModel
                .findByIdAndDelete(userId)
                .then((deletedUser) => {
                    res
                        .status(errorHandler.status.OK)
                        .json({
                            status: errorHandler.status.OK,
                            message: "User deleted successfully",
                            object: deletedUser
                        })
                })
        }
    } catch (error) {
        return reportInternalError(res, error)
    }
}

module.exports = {
    register,
    login,
    getUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
}

function reportInternalError(res, error) {
    return res.status(errorHandler.status.INTERNAL_SERVER_ERROR).json({
        status: errorHandler.status.INTERNAL_SERVER_ERROR,
        message: error,
    })
}
