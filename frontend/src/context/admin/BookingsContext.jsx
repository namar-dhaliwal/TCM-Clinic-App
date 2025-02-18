import { createContext, useContext, useReducer, useEffect } from 'react'

const BookingsContext = createContext()

const initialStateReworked = [
	{
		id: '1',
		name: 'Room 1',
		bookings: [{
			id: 1,
			start: new Date(2025, 1, 17, 9, 0),
			end: new Date(2025, 1, 17, 9, 30),
			data: {
				doctorName: 'Dr. John Doe',
				patientName: 'Jane Doe',
				otherNotes: 'This is a test booking',
			},
		}],
	},
	{
		id: '2',
		name: 'Room 2',
		bookings: [{}],
	},
]

const BookingsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_BOOKINGS':
			return state.map((room) => {
				if (room.id === action.payload.roomId) {
					return {
						...room,
						bookings: action.payload.bookings,
					}
				}
				return room
			})
		case 'ADD_BOOKING':
			
			return state.map((room) => {
				if (room.id === action.payload.roomId) {
					return {
						...room,
						bookings: [...room.bookings, action.payload.booking],
					}
				}
				return room
			})
		case 'DELETE_BOOKING':
			return state.map((room) => {
				if (room.id === action.payload.roomId) {
					return {
						...room,
						bookings: room.bookings.filter(
							(booking) => booking.id !== action.payload.bookingId
						),
					}
				}
				return room
			})
		case 'EDIT_BOOKING':
			return state.map((room) => {
				if (room.id === action.payload.roomId) {
					return {
						...room,
						bookings: room.bookings.map((booking) => {
							if (booking.id === action.payload.booking.id) {
								return action.payload.booking
							}
							return booking
						}),
					}
				}
				return room
			})
	}
}

const BookingsProvider = ({ children }) => {
	const [state, dispatch] = useReducer(BookingsReducer, initialStateReworked)

	return (
		<BookingsContext.Provider value={{ state, dispatch }}>
			{children}
		</BookingsContext.Provider>
	)
}

const useBookingsContext = () => {
	const context = useContext(BookingsContext)
	if (!context) {
		throw new Error(
			'useBookingsContext must be used within a BookingsProvider'
		)
	}
	return context
}

export { BookingsProvider, useBookingsContext }
