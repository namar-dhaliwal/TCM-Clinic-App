import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/bookings'

export const fetchBookings = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const createBooking = async (booking) => {
    try {
        const response = await axios.post(API_BASE_URL, booking);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const patchBooking = async (booking) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${booking._id}`, booking);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteBooking = async (bookingId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${bookingId}`);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
}