const express = require('express')
const {
    createReview,
    getReviews,
    getReview,
    deleteReview,
    updateReview
} = require('../controllers/reviewController')

const router = express.Router()


// GET ALL reviews popup window on homepage
router.get('/reviews', getReviews)

// GET one review in popup window on homepage based on id
router.get('/reviews/:id', getReview)

// POST a review in popup window on homepage
router.post('/reviews', createReview)

// DELETE a review in popup window on homepage based on id
router.delete('/reviews/:id', deleteReview)

// UPDATE a review in popup window on homepage based on id
router.patch('/reviews/:id', updateReview)

// Filter reviews in popup window on homepage to show only reviews sent by the authenticated user, will need to learn auth
router.get('/reviews/myreviews', (req, res) => {
    res.json({mssg: 'Request for all reviews by the logged in user'})
})


module.exports = router