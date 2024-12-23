require('dotenv').config()

const express = require('express')
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


//listen for reqs
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})