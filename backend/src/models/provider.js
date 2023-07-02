const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose");
//const findOrCreate = require('mongoose-findorcreate')

const providerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        default: 'provider'
    },
    phoneNumber : {
        type : Number,
        required : true
    }

})

providerSchema.plugin(passportLocalMongoose);  
//providerSchema.plugin(findOrCreate);

const Provider = mongoose.model('provider',providerSchema)

module.exports = Provider