const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    carName : String,
    carPrice : Number,
    carImage : String,
    carType : String,
    carSeats : Number,
    carFuelCapacity : Number,
    carDriveType : {type: String, enum: ['manual', 'automatic']},
    carPriceIsDiscounted : {type: Boolean, default: false},
    carDiscountedPrice : {type: Number, default: this.carPrice},
})

const carsModel = mongoose.model('cars', carSchema)

module.exports = carsModel