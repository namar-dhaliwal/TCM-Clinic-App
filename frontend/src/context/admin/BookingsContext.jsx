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
					title: 'John Doe',
					start: new Date(2025, 1, 1, 10, 0),
					end: new Date(2025, 1, 1, 11, 0),
				},
			],
		},
		{
			id: 'room-2',
			name: 'Room 2',
			bookings: [
				{
					id: 1,
					title: 'Jane Smith',
					start: new Date(2025, 1, 1, 13, 0),
					end: new Date(2025, 1, 1, 14, 0),
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