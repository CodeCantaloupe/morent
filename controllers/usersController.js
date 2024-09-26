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
        } else if (await usersModel.findOne({userEmail: newUserData.userEmail})) {
            return res.status(errorHandler.status.BAD_REQUEST).json({
                status: errorHandler.status.BAD_REQUEST,
                message: "User already exists"
            })
        } else if (await usersModel.findOne({userName: newUserData.userName})) {
            return res.status(errorHandler.status.BAD_REQUEST).json({
                status: errorHandler.status.BAD_REQUEST,
                message: "User already exists"
            })
        } 
        let hashedPassword = await bcrypt.hash(newUserData.userPassword, saltRounds)
        let newUser = await usersModel.create({...newUserData, userPassword: hashedPassword})
        
        return res.status(errorHandler.status.CREATED).json({
            status: errorHandler.status.CREATED,
            message: "New user registered successfully",
            object: newUser,
        })
    } catch (error) {
        res.status(errorHandler.status.INTERNAL_SERVER_ERROR).json({message: error})
    }
}

const login = async (req, res) => {
    try {
        let userCredentials = req.body
        let getUser = await usersModel.findOne({userEmail: userCredentials.userEmail})

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
            let token = jwt.sign({id: getUser._id}, process.env.TOKEN_SECRET)
            return res
            .cookie('jwt_token', token)
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
        .json({message: error})
    }
}

const getUsers = async (req, res) => {
    res.status(errorHandler.status.OK).json({
        status: errorHandler.status.OK,
        message: "Users fetched successfully",
        object: await usersModel.find(),
    })
}

const getSingleUser = (req, res) => {}

const addUser = (req, res) => {}

const updateUser = (req, res) => {}

const deleteUser = (req, res) => {}

module.exports = {
    register,
    login,
    getUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
}