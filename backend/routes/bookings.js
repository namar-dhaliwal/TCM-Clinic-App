const express = require('express')
const {
    checkRequiredPermissions,
    validateAccessToken
} = require('../middleware/auth0.js')
const { AdminPermissions } = require('../models/AdminPermissions.js')

const bookingsRouter = express.Router()

// Dummy routes for testing user auth and permissions
bookingsRouter.get('/public', (req, res) => {
    const message = "This is a public endpoint"

    res.status(200).json(message)
})

bookingsRouter.get('/protected', validateAccessToken, (req, res) => {
    const message = "This is a protected endpoint"

    res.status(200).json(message)
})

bookingsRouter.get('/admin', validateAccessToken, checkRequiredPermissions([AdminPermissions.Read]), (req, res) => {
    const message = "This is a admin endpoint"

    res.status(200).json(message)
})

module.exports = bookingsRouter