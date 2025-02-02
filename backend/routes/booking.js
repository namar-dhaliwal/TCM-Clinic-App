const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

//GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET bookings by date
router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const bookings = await Booking.find({ date: new Date(date) });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST a new booking
router.post("/", async (req, res) => {
  try {
    const { patientName, doctorName, date, startTime, endTime } = req.body;
    const newBooking = new Booking({
      patientName,
      doctorName,
      date,
      startTime,
      endTime,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//PATCH - Update a booking
router.patch("/:id", async (req, res) => {
  try {
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
});

//DELETE a booking
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
