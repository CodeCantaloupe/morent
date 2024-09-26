const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    carName : String,
    carPrice : Number,
    carImage : String,
    carDescription : String,
    carType : String,
    carSeats : Number,
    carFuelCapacity : String,
    carDriveType : String,
    carPriceIsDiscounted : Boolean,
    carDiscountedPrice : Number,
})

const carsModel = mongoose.model('cars', carSchema)

module.exports = carsModel