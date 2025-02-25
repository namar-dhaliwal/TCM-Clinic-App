require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const webpageRoutes = require("./routes/webpages");
const reviewRoutes = require("./routes/reviews");
const bookingsRoutes = require("./routes/booking");

const app = express();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONG_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error.message);
    throw error; // If DB connection fails, the function will fail and return 500
  }
};

module.exports = async (req, res) => {
  try {
    // Wait for MongoDB connection before proceeding with the request
    await connectToMongoDB();

    // more middlemare, vid 3 10:30
    app.use(express.json());

    // middleware to log routing requests that come in, from website itself or postman simulations
    app.use((req, res, next) => {
      console.log(req.path, req.method);
      next();
    });

    // serving frontend staticcally
    app.use(express.static('dist')) 

    // page routes
    app.use("/api/pages/", webpageRoutes);
    app.use("/api/pages/", reviewRoutes); // review routes, will change routing after
    app.use(`/api/bookings/`, bookingsRoutes);

    // Return the app and handle request once everything has been set up properly
    return app(req, res);
  } catch (error) {
    return res.status(500).send("Error connecting to the database or initializing routes.");
  }
};
