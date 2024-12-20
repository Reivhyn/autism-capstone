const { default: mongoose } = require("mongoose");

const parentUser = new mongoose.Schema({
    userName:{type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String,
        maxLength: 48,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
    password: {type: String, required: true},
},
{Timestamp: true})