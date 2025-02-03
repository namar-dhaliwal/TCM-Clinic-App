import { createContext, useContext, useReducer } from 'react'

const BookingsContext = createContext()

const initialState = {
	rooms: [
		{
			id: 'room-1',
			name: 'Room 1',
			bookings: [
				{
					id: 1,
					start: new Date(2025, 1, 2, 10, 0),
					end: new Date(2025, 1, 2, 11, 0),
					data: {
						doctorName: 'Dr. John Doe',
						patientName: 'John Smith',
						otherNotes: 'Patient has a history of high blood pressure',
					}
				},
			],
		},
		{
			id: 'room-2',
			name: 'Room 2',
			bookings: [
				{
					id: 1,
					start: new Date(2025, 1, 2, 13, 0),
					end: new Date(2025, 1, 2, 14, 0),
					data: {
						doctorName: 'Dr. Jane Doe',
						patientName: 'Jane Smith',
						otherNotes: 'Patient has a history of low blood pressure',
					}
				},
			],
		},
	],
}

const BookingsReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_BOOKING':
			return { ...state, rooms: state.rooms.map((room) => {
                if (room.id === action.payload.roomId) {
                    return {...room, bookings: [...room.bookings, action.payload.booking]}
                }
                return room;
            }) }
		case 'DELETE_BOOKING':
			return { ...state, rooms: state.rooms.map((room) => {
				if (room.id === action.payload.roomId) {
					return {...room, bookings: room.bookings.filter((booking) => booking.id !== action.payload.bookingId)}
				}
				return room;
			}) }
	}
}

const BookingsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(BookingsReducer, initialState);

    return (
        <BookingsContext.Provider value={{state, dispatch}}>
            {children}
        </BookingsContext.Provider>
    )
}

const useBookingsContext = () => {
    const context = useContext(BookingsContext);
    if (!context) {
        throw new Error('useBookingsContext must be used within a BookingsProvider')
    }
    return context;
}

export { BookingsProvider, useBookingsContext };