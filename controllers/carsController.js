const errorHandler = require('../utils/errorHandler')

const getCars = (req, res) => {
    res.status(errorHandler.status.OK).json({
        status: errorHandler.status.OK,
        message: 'All cars fetched successfully',
    })
}

const getSingleCar = (req, res) => {}

const addCar = (req, res) => {}

const updateCar = (req, res) => {}

const deleteCar = (req, res) => {}

module.exports = {
    getCars,
    getSingleCar,
    addCar,
    updateCar,
    deleteCar
}