import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/bookings'

export const fetchBookings = async (roomName) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${roomName}`);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const createBooking = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${data.roomName}`, data.booking);
        return response;
    } catch (err) {
        throw err;
    }
}

export const patchBooking = async (data) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${data.roomName}/${data.booking.id}`, data.booking);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteBooking = async (data) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${data.roomName}/${data.bookingId}`);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}