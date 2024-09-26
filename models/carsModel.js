const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    carName : String,
    carPrice : Number,
    carImage : String,
    carType : String,
    carSeats : Number,
    carFuelCapacity : Number,
    carDriveType : {type: String, enum: ['manual', 'automatic']},
    carPriceIsDiscounted : Boolean,
    carDiscountedPrice : Number,
})

const carsModel = mongoose.model('cars', carSchema)

module.exports = carsModel