import { fetchBookings, createBooking, patchBooking, deleteBooking } from "../services/BookingService";

export const getBookings = async (roomId) => {
    try {
        const roomName = `bookingsRoom${roomId}`;
        const response = await fetchBookings(roomName);
        return response.data.map((booking) => {
            return {
                id: booking._id,
                start: new Date(booking.startTime),
                end: new Date(booking.endTime),
                data: {
                    doctorName: booking.doctorName,
                    patientName: booking.patientName,
                    otherNotes: booking.otherNotes
                }
            }
        })
    } catch (err) {
        console.error(err);
    }
}

export const addBooking = async (booking) => {
    try {
        const bookingToSend = {
            startTime: booking.start,
            endTime: booking.end,
            doctorName: booking.data.doctorName,
            patientName: booking.data.patientName,
            otherNotes: booking.data.otherNotes
        }
        const response = await createBooking(bookingToSend);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const updateBooking = async (booking) => {
    try {
        const bookingToSend = {
            _id: booking.id,
            startTime: booking.start,
            endTime: booking.end,
            doctorName: booking.data.doctorName,
            patientName: booking.data.patientName,
            otherNotes: booking.data.otherNotes
        }
        const response = await patchBooking(bookingToSend);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const removeBooking = async (bookingId) => {
    try {
        const response = await deleteBooking(bookingId);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}