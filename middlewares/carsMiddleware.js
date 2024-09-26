const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')

const carsMiddleware = (req, res, next) => {
    try {
        next()
        let jwt_token = req.cookies?.jwt_token
        if(!jwt_token) {
            res
            .status(errorHandler.status.UNAUTHORIZED)
            .json({
                status: errorHandler.status.UNAUTHORIZED,
                message: 'Unauthorized access please login'
            })
        } else if (jwt.verify(jwt_token, process.env.TOKEN_SECRET)) {
            next()
        }
    } catch (error) {
        console.log(error);
        res
        .status(errorHandler.status.INTERNAL_SERVER_ERROR)
        .json({
            status: errorHandler.status.INTERNAL_SERVER_ERROR,
            message: 'Internal server error:' + error
        })
    }
}

module.exports = carsMiddleware