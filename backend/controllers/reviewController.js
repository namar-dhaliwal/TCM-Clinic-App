const Review = require('../models/ReviewsModel')
const mongoose = require('mongoose')

// GET ALL reviews popup window on homepage
const getReviews = async(req, res) => {
    const reviews = await Review.find({}).sort({createdAt: -1})

    res.status(200).json(reviews)

}

// GET one review in popup window on homepage based on id
const getReview = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Request is invalid'}) // if the id itself is invalid you get this code block
    }

    const review = await Review.findById(id)

    if (!review) {
        return res.status(404).json({error: 'No such review exists.'}) //if the id is valid but no review with that id exists you get this code block
    }
    res.status(200).json(review)
}

// POST a review in popup window on homepage
const createReview = async (req, res) => {    
    const {rating, title, body, name, date} = req.body

    // add review to db
    try {
        const review = await Review.create({rating, title, body, name, date})
        res.status(200).json(review)
    }   catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a review in popup window on homepage based on id
const deleteReview = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Request is invalid'})
    }

    const review = await Review.findOneAndDelete({_id: id})

    if (!review) {
        return res.status(404).json({error: 'No such review exists.'})
    }
    
    res.status(200).json(review)
}


// UPDATE a review in popup window on homepage based on id
const updateReview = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'Request is invalid'})
    }

    const review = await Review.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!review) {
        return res.status(404).json({error: 'No such review exists.'})
    }
    
    res.status(200).json(review)
}


// Filter reviews in popup window on homepage to show only reviews sent by the authenticated user, will need to learn auth


module.exports = {
    createReview,
    getReviews,
    getReview,
    deleteReview,
    updateReview
}