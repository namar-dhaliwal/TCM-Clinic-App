import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/bookings'

export const getBookings = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const addBooking = async (booking) => {
    try {
        const response = await axios.post(API_BASE_URL, booking);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const updateBooking = async (booking) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${booking._id}`, booking);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export const deleteBooking = async (bookingId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${bookingId}`);
        return response.daat;
    } catch (err) {
        console.error(err);
    }
}