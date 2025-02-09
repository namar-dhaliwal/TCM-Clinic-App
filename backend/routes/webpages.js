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


module.exports = router
