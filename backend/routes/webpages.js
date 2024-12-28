const express = require('express')

const router = express.Router()

// Load landing page
router.get('/', (req, res) => {
    res.json({mssg: 'Request for the homepage'})
})

// Load about us page
router.get('/aboutus', (req, res) => {
    res.json({mssg: 'Request for the about us page'})
})

// Load treatments page
router.get('/treatments', (req, res) => {
    res.json({mssg: 'Request for the treatments page'})
})

// Load contacts/hours page
router.get('/hours', (req, res) => {
    res.json({mssg: 'Request for the clinic info and hours page'})
})



// GET ALL reviews popup window on homepage
router.get('/reviews', (req, res) => {
    res.json({mssg: 'Request for all reviews'})
})

// GET one review in popup window on homepage based on id
router.get('/reviews/:id', (req, res) => {
    res.json({mssg: 'Request to retrieve/read singular review based on parameter id'})
})

// POST a review in popup window on homepage
router.post('/reviews', (req, res) => {
    res.json({mssg: 'Request to create singular review.'})
})

// DELETE a review in popup window on homepage based on id
router.delete('/reviews/:id', (req, res) => {
    res.json({mssg: 'Request to delete singular review based on parameter id'})
})

// UPDATE a review in popup window on homepage based on id
router.patch('/reviews/:id', (req, res) => {
    res.json({mssg: 'Request to modify/update singular review based on parameter id'})
})

// Filter reviews in popup window on homepage to show only reviews sent by the authenticated user, will need to learn auth
router.get('/reviews/myreviews', (req, res) => {
    res.json({mssg: 'Request for all reviews by the logged in user'})
})


module.exports = router
