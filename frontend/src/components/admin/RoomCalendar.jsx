import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import {
	format,
	parse,
	startOfDay,
	endOfDay,
	startOfWeek,
	endOfWeek,
	getDay,
} from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './RoomCalendar.css'

// components
import BookingModal from './BookingModal'

// context
import { useDateContext } from '../../context/admin/DateContext'
import { useBookingsContext } from '../../context/admin/BookingsContext'

const locales = {
	'en-Us': enUS,
}

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfDay,
	endOfDay,
	getDay,
	startOfWeek,
	endOfWeek,
	locales,
})

const RoomCalendar = ({ roomId }) => {
	const { selectedDate, setSelectedDate } = useDateContext()
	const { state } = useBookingsContext()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedSlotStart, setSelectedSlot] = useState(null)

	const currentRoom = state.rooms.find((room) => room.id === roomId)

	const handleDateChange = (date) => {
		setSelectedDate(date)
	}

	const handleSelectSlot = (slotInfo) => {
		if (slotInfo.action !== 'click') {
			return
		}

		setSelectedSlot(slotInfo.start)
		setIsModalOpen(true)
	}

	return (
		<div className='flex flex-col items-center'>
			<BookingModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				defaultStart={selectedSlotStart}
				roomId={roomId}
				className='z-10'
			/>
			<h2 className='font-bold text-xl underline'>{currentRoom.name}</h2>
			<Calendar
				localizer={localizer}
				events={currentRoom.bookings}
				startAccessor='start'
				endAccessor='end'
				defaultView='day'
				date={selectedDate}
				onNavigate={handleDateChange}
				selectable
				onSelectSlot={handleSelectSlot}
				views={['month', 'week', 'day']}
				min={new Date(2025, 0, 1, 8, 0, 0)}
				max={new Date(2025, 0, 1, 19, 0, 0)}
				style={{ maxHeight: 500 }}
				className='z-0'
			/>
		</div>
	)
}

export default RoomCalendar
