const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    reviewRating: {
        type: Number,
        required: true
    },
    reviewTitle: {
        type: String,
    },
    reviewBody: {
        type: String,
    },
    reviewName: {
        type: String,
    },
    reviewDate: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)