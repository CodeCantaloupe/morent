const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/errorHandler')

const usersMiddleware = (req, res, next) => {
    try {
        let jwt_token = req.cookies?.jwt_token
        if(!jwt_token) {
            res
            .status(errorHandler.status.UNAUTHORIZED)
            .json({
                status: errorHandler.status.UNAUTHORIZED,
                message: 'Unauthorized access please login'
            })
        } else if (jwt.verify(jwt_token, process.env.TOKEN_SECRET)) {
            if (jwt.decode(jwt_token).userRole === 'admin') {
                next()
            } else {
                res
                .status(errorHandler.status.FORBIDDEN)
                .json({
                    status: errorHandler.status.FORBIDDEN,
                    message: 'You don\'t have adminstrative privileges'
                })
            }
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

module.exports = usersMiddleware