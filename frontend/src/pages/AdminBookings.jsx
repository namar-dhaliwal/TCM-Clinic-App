import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'
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
	addHours,
	set,
} from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// components
import LogoutButton from '../components/admin/LogoutButton'

// css
import './AdminBookings.css'

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

const initialBookings = [
	{
		id: 1,
		title: 'John Doe',
		start: new Date(2025, 0, 30, 10, 0),
		end: new Date(2025, 0, 30, 11, 0),
	},
	{
		id: 2,
		title: 'Jane Smith',
		start: new Date(2025, 0, 30, 14, 0),
		end: new Date(2025, 0, 30, 15, 0),
	},
]

const Admin = () => {
	const { user, logout } = useAuth0()

	const roles = user?.['https://tcm-clinic/roles'] || []
	if (!roles.includes('TCM Clinic Admin')) {
		logout()
		return <Navigate to='/admin/login' replace />
	}

	const [bookings, setBookings] = useState(initialBookings)
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [newBooking, setNewBooking] = useState({
		patientName: '',
		start: null,
		end: null,
	})

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

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setNewBooking({
			...newBooking,
			[name]: value,
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!newBooking.patientName || !newBooking.start || !newBooking.end) {
			alert('Please fill in all fields')
			return
		}

		const newBookingObject = {
			id: bookings.length + 1,
			patientName: newBooking.patientName,
			start: newBooking.start,
			end: newBooking.end,
		}

		setBookings([...bookings, newBookingObject])
		setNewBooking({
			patientName: '',
			start: null,
			end: null,
		})
	}

	// const filteredBookings = bookings.filter((booking) => {
	// 	const bookingDate = new Date(booking.start)
	// 	return (
	// 		bookingDate.getFullYear() === selectedDate.getFullYear() &&
	// 		bookingDate.getMonth() === selectedDate.getMonth() &&
	// 		bookingDate.getDate() === selectedDate.getDate()
	// 	)
	// })

	return (
		<div className='flex flex-col items-start'>
			<div className='flex flex-col items-center'>
				<h2>Room 1</h2>
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
			<div className='flex flex-col'>
				<h2>Create Booking</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label>Patient Name: </label>
						<input
							type='text'
							name='title'
							value={newBooking.patientName}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label>Start Time: </label>
						<input
							type='datetime-local'
							name='start'
							value={
								newBooking.start
									? format(
											newBooking.start,
											"yyyy-MM-dd'T'HH:mm"
									  )
									: ''
							}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label>End Time: </label>
						<input
							type='datetime-local'
							name='end'
							value={
								newBooking.end
									? format(
											newBooking.end,
											"yyyy-MM-dd'T'HH:mm"
									  )
									: ''
							}
							onChange={handleInputChange}
							required
						/>
					</div>
					<button type='submit'>Book</button>
				</form>
			</div>
			<LogoutButton />
		</div>
	)
}

export default Admin
