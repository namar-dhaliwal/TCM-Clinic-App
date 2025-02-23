const getBookingModel = require('../models/Booking')
const mongoose = require('mongoose')

//GET all bookings for a room
const getBookings = async(req, res) => {
    try {
        const roomName = req.params.roomName
        const Booking = await getBookingModel(roomName)
    
        const bookings = await Booking.find();
        res.json(bookings);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

//POST a new booking
const createBooking = async (req, res) => {
    try {
        const { patientName, doctorName, startTime, endTime } = req.body;
        const roomName = req.params.roomName;
        const Booking = await getBookingModel(roomName);
    
        const newBooking = new Booking({
          patientName,
          doctorName,
          startTime,
          endTime,
        });
        await newBooking.save();
        res.status(201).json(newBooking);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
}

//PATCH - Update a booking
const updateBooking = async(req, res) => {
    try {
        const roomName = req.params.roomName;
        const Booking = await getBookingModel(roomName);
    
        const updatedBooking = await Booking.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!updatedBooking)
          return res.status(404).json({ message: "Booking not found" });
        res.json(updatedBooking);
      } catch (err) {
        res.status(400).json({ error: err.message });

    }
}

//DELETE a booking
const deleteBooking = async(req, res) => {
    try {
        const roomName = req.params.roomName;
        const Booking = await getBookingModel(roomName);
    
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking)
          return res.status(404).json({ message: "Booking not found" });
        res.json({ message: "Booking deleted" });
      } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking
}