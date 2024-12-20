const { default: mongoose } = require("mongoose");

const KidUser = new mongoose.Schema({
    userName:{type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    dob: {type: Date, required: true},
    email: {type: String,
        maxLength: 48,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
    password: {type: String, required: true},
    parentUser: {type: String},
    gamesAccess: {type: Array},
    chatAccess: {type: Array},
    learningAccess: {type: Array}
},
{Timestamp: true})

module.exports = mongoose.model('kidUser', KidUser)