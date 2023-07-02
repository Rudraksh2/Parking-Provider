const mongoose = require('mongoose')

const slotsSchema = new mongoose.Schema({
    parkingID : {
        type : String,
        required : true
    },
    carSpace : {
        type : Number
    },
    bikeSpace : {
        type : Number
    },
    time : {
        type : String,
        required : true
    }
})

const Slots = mongoose.model('slots',slotsSchema)

module.exports = Slots