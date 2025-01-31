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

// context
import { useDateContext } from '../../context/admin/DateContext'

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

const RoomCalendar = ({ initialBookings, title }) => {
    const { selectedDate, setSelectedDate } = useDateContext()
	const [bookings, setBookings] = useState(initialBookings)

	const handleDateChange = (date) => {
		setSelectedDate(date)
	}

	const handleSelectSlot = (slotInfo) => {
		setNewBooking({
			...newBooking,
			start: slotInfo.start,
			end: slotInfo.end,
		})
	}

	return (
		<div className='flex flex-col items-center'>
            <h2 className='font-bold text-xl underline'>{title}</h2>
			<Calendar
				localizer={localizer}
				events={bookings}
				startAccessor='start'
				endAccessor='end'
				defaultView='day'
				date={selectedDate}
				onNavigate={handleDateChange}
				selectable
				onSelectSlot={handleSelectSlot}
				style={{ height: 500, width: 800 }}
			/>
		</div>
	)
}

export default RoomCalendar
