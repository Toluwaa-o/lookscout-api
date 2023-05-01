const mongoose = require('mongoose')

const InfoSchema = new mongoose.Schema({
    button: {
        type: String,
        required: true
    },
    lightMode: {
        type: String,
        default: "/uploads/logo-lightMode.png"
    },
    darkMode: {
        type: String,
        default: "/uploads/logo-darkMode.svg"
    }
})

module.exports = mongoose.model('Info', InfoSchema)