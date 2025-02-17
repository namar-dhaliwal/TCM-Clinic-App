import { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import {
	format,
	parse,
	startOfDay,
	endOfDay,
	startOfWeek,
	endOfWeek,
	getDay,
	set,
} from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './RoomCalendar.css'

// components
import BookingModal from './BookingModal'

// context
import { useDateContext } from '../../context/admin/DateContext'
import { useBookingsContext } from '../../context/admin/BookingsContext'
import CustomEvent from './CustomEvent'
import EventModal from './EventModal'

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

const RoomCalendar = ({ roomId, view, setView }) => {
	const { selectedDate, setSelectedDate } = useDateContext()
	const { state } = useBookingsContext()
	const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
	const [isEventModalOpen, setIsEventModalOpen] = useState(false)
	const [eventData, setEventData] = useState(null)
	const [selectedSlotStart, setSelectedSlot] = useState(null)
	const currentRoom = state.find((room) => room.id === roomId)

	// custom calendar components
	const components = {
		event: ({ event }) => {
			const data = event.data

			return <CustomEvent booking={data} />
		},
	}

	const handleDateChange = (newDate) => {
		setSelectedDate(newDate)
	}

	const handleViewChange = (newView) => {
		setView(newView)
	}

	const handleSelectSlot = (slotInfo) => {
		if (slotInfo.action !== 'click') {
			return
		}

		setSelectedSlot(slotInfo.start)
		setIsBookingModalOpen(true)
	}

	const handleEventDoubleClick = (event) => {
		setIsEventModalOpen(true)
		setEventData(event)
	}

	return (
		<div className='flex flex-col items-center'>
			<h2 className='font-bold text-xl underline'>{currentRoom.name}</h2>
			<Calendar
				localizer={localizer}
				events={currentRoom.bookings}
				startAccessor='start'
				endAccessor='end'
				defaultView='day'
				view={view}
				onView={handleViewChange}
				date={selectedDate}
				onNavigate={handleDateChange}
				selectable
				onSelectSlot={handleSelectSlot}
				views={['month', 'week', 'day']}
				min={new Date(2025, 0, 1, 8, 0, 0)}
				max={new Date(2025, 0, 1, 19, 0, 0)}
				style={{ height: 600 }}
				className='lg:min-w-[36rem] z-0'
				components={components}
				step={15}
				timeslots={4}
				onDoubleClickEvent={handleEventDoubleClick}
			/>
			<BookingModal
				isOpen={isBookingModalOpen}
				onClose={() => setIsBookingModalOpen(false)}
				defaultStart={selectedSlotStart}
				roomId={roomId}
				className='z-10'
			/>
			<EventModal
				event={eventData}
				isOpen={isEventModalOpen}
				onClose={() => setIsEventModalOpen(false)}
				roomId={roomId}
				className='z-10'
			/>
		</div>
	)
}

export default RoomCalendar
