const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    name: {
        type: String,
    },
    date: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)