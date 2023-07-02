const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
//const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    bookedParking: [
        {
            parkingID: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            ownerID: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.plugin(passportLocalMongoose);
//userSchema.plugin(findOrCreate);

const User = mongoose.model('user', userSchema);

module.exports = User