const express = require('express');
const {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

const router = express.Router();

//GET all bookings for a room
router.get('/:roomName', getBookings);

// legacy code, not working with new date format
//GET bookings by date
/*
router.get("/:date", async (req, res) => {
  try {
    const { date } = req.params;
    const bookings = await Booking.find({ date: new Date(date) });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/

//POST a new booking
router.post('/:roomName', createBooking);

//PATCH - Update a booking
router.patch('/:roomName/:id', updateBooking);

//DELETE a booking
router.delete('/:roomName/:id', deleteBooking);

module.exports = router;
