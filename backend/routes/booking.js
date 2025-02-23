const express = require('express')
const Booking = require('../models/Booking')
const router = express.Router()
const getBookingModel = require('../models/Booking')

//GET all bookings for a room
router.get('/:roomName', async (req, res) => {
	try {
		const roomName = req.params.roomName
		const Booking = await getBookingModel(roomName)

		const bookings = await Booking.find()
		res.json(bookings)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

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
router.post('/:roomName', async (req, res) => {
	try {
		const { patientName, doctorName, startTime, endTime } = req.body
		const roomName = req.params.roomName
		const Booking = await getBookingModel(roomName)

		const overlappingBooking = await Booking.findOne({
			$or: [
				{ startTime: { $gte: startTime, $lt: endTime } },
				{ endTime: { $gt: startTime, $lte: endTime } },
				{ startTime: { $lte: startTime }, endTime: { $gte: endTime } },
			],
		})

		if (overlappingBooking) {
			return res
				.status(400)
				.json({
					error:
						'Booking time conflicts with an existing appointment.',
				})
		}

		const newBooking = new Booking({
			patientName,
			doctorName,
			startTime,
			endTime,
		})
		await newBooking.save()
		res.status(201).json(newBooking)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

//PATCH - Update a booking
router.patch('/:roomName/:id', async (req, res) => {
	try {
		const roomName = req.params.roomName
		const Booking = await getBookingModel(roomName)

		const updatedBooking = await Booking.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		if (!updatedBooking)
			return res.status(404).json({ message: 'Booking not found' })
		res.json(updatedBooking)
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
})

//DELETE a booking
router.delete('/:roomName/:id', async (req, res) => {
	try {
		const roomName = req.params.roomName
		const Booking = await getBookingModel(roomName)

		const deletedBooking = await Booking.findByIdAndDelete(req.params.id)
		if (!deletedBooking)
			return res.status(404).json({ message: 'Booking not found' })
		res.json({ message: 'Booking deleted' })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
})

module.exports = router
