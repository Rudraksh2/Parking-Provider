const mongoose = require('mongoose')

const parkingSchema = new mongoose.Schema({
    providerID: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    space: {
        type: Number
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    slots: [
        {
            space: {
                type: Number,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        }
    ]
})

const Parking = mongoose.model('parking', parkingSchema)

module.exports = Parking