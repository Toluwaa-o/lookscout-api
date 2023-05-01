const mongoose = require('mongoose')

const InfoSchema = new mongoose.Schema({
    button: {
        type: String,
        required: true
    },
    lightMode: {
        type: String,
        default: "https://lookscout-ig7v.onrender.com/uploads/logo-lightMode.png"
    },
    darkMode: {
        type: String,
        default: "https://lookscout-ig7v.onrender.com/uploads/logo-darkMode.svg"
    }
})

module.exports = mongoose.model('Info', InfoSchema)