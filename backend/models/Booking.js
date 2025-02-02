const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
