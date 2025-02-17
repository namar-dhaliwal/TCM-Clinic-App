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
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

/**
 * Gets a particular collection/model to work with based on roomName
 * 
 * @param {*} roomName Name of a collection of bookings
 * @returns A Booking collection/model
 */
const getBookingCollection = async (roomName) => {
  const collections = await mongoose.connection.db.listCollections().toArray()
  const collectionNames = collections.map((collection) => collection.name);

  // Making sure roomName is in the correct format
  const bookingsRoomPattern = /^bookingsRoom\d+$/
  if (!bookingsRoomPattern.test(roomName)) {
    throw new Error('The room name does not match the pattern.')
  }

  // Checking if the collection exists
  if (collectionNames.includes(roomName)) {
    return mongoose.model("Booking", bookingSchema, roomName)
  } else {
    throw new Error('The room (collection) does not exist.')
  }
}

module.exports = getBookingCollection;
