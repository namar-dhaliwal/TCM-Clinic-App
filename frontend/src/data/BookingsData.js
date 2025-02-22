import {
	fetchBookings,
	createBooking,
	patchBooking,
	deleteBooking,
} from '../services/BookingService'

export const getBookings = async (roomId) => {
	try {
		const roomName = `bookingsRoom${roomId}`
		const response = await fetchBookings(roomName)
		return response.data.map((booking) => {
			return {
				id: booking._id,
				start: new Date(booking.startTime),
				end: new Date(booking.endTime),
				data: {
					doctorName: booking.doctorName,
					patientName: booking.patientName,
					otherNotes: booking.otherNotes,
				},
			}
		})
	} catch (err) {
		console.error(err)
	}
}

export const addBooking = async (booking) => {
	try {
		const dataToSend = {
			roomName: `bookingsRoom${booking.roomId}`,
			booking: {
				startTime: booking.start,
				endTime: booking.end,
				doctorName: booking.data.doctorName,
				patientName: booking.data.patientName,
				otherNotes: booking.data.otherNotes,
			},
		}
		const response = await createBooking(dataToSend)
		const dataToReturn = {
			id: response.data._id,
			start: new Date(response.data.startTime),
			end: new Date(response.data.endTime),
			data: {
				doctorName: response.data.doctorName,
				patientName: response.data.patientName,
				otherNotes: response.data.otherNotes,
			},
		}
		return dataToReturn
	} catch (err) {
		throw Error(err.response?.data?.error)
	}
}

export const updateBooking = async (booking) => {
	try {
		const dataToSend = {
			booking: {
				id: booking.id,
				startTime: booking.start,
				endTime: booking.end,
				doctorName: booking.data.doctorName,
				patientName: booking.data.patientName,
				otherNotes: booking.data.otherNotes,
			},
			roomName: `bookingsRoom${booking.roomId}`,
		}
		const response = await patchBooking(dataToSend)
		return response.data
	} catch (err) {
		console.error(err)
	}
}

export const removeBooking = async (data) => {
	try {
		const dataToSend = {
			roomName: `bookingsRoom${data.roomId}`,
			bookingId: data.bookingId,
		}
		const response = await deleteBooking(dataToSend)
		return response.data
	} catch (err) {
		console.error(err)
	}
}
