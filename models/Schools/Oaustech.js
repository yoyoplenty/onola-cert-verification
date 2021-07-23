const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const Oaustechcertificate = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Oaustech', Oaustechcertificate)