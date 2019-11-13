/*jshint esversion: 8 */
const mongoos = require('mongoose');

const userSchema = mongoos.Schema({
    name:{
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    lastName:{
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    DOB: {
        type: Date,
        required: true
    },
    gender:{
        type: String,
        required: true,
        max: 1
    },
    email:{
        type: String,
        required: true,
        max: 255
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    phoneNo:{
        type: String,
        required: true,
        min:10,
        max:15
    },
    street:{
        type: String,
        required: true,
        min: 10,
        max: 100
        
    },
    city:{
        type: String,
        required: true,
        max: 20
    },
    state:{
        type: String,
        required: true,
        max: 2

    },
    zip:{
        type: String,
        required: true,
        max: 5
    }

});

module.exports = mongoos.model('User', userSchema);