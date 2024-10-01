const mongoose = require('mongoose')    

const userSchema = new mongoose.Schema({
    userFirstName : String,
    userLastName : String,
    userName: String,
    userEmail : String,
    userPassword : String,
    userProfileImage : String,
    userRole: {type : String, enum : ['admin', 'user']},
    userStatus: {type : String, enum: ['active', 'inactive', 'suspended', 'deleted']},
    userCreatedAt : {type : Date, default : Date.now},
    userUpdatedAt : {type : Date, default : Date.now},
})

const usersModel = mongoose.model('users', userSchema)

module.exports = usersModel