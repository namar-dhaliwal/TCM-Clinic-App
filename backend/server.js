require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const webpageRoutes = require('./routes/webpages')


//invoke express app
const app = express()

// more middlemare, vid 3 10:30
app.use(express.json())

// middleware to log routing requests that come in, from website itself or postman simulations
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// page routes 
app.use('/api/pages/', webpageRoutes)

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for reqs
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

