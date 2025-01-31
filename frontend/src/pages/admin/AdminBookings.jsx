import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'

// components
import LogoutButton from '../../components/admin/LogoutButton'
import RoomCalendar from '../../components/admin/RoomCalendar'

// context / providers
import { DateProvider } from '../../context/admin/DateContext'
import { useBookingsContext } from '../../context/admin/BookingsContext'

const Admin = () => {
	const { user, logout } = useAuth0()
	const { state } = useBookingsContext()

	const roles = user?.['https://tcm-clinic/roles'] || []
	if (!roles.includes('TCM Clinic Admin')) {
		logout()
		return <Navigate to='/admin/login' replace />
	}

	const [newBooking, setNewBooking] = useState({
		title: '',
		start: null,
		end: null,
	})

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

		console.log(newBookingObject)
		setNewBooking({
			patientName: '',
			start: null,
			end: null,
		})
	}

	return (
		<DateProvider>
				<div className='flex flex-col w-screen pt-4'>
					<div className='flex self-end mr-8'>
						<LogoutButton />
					</div>
					<div className='flex flex-wrap w-full justify-evenly gap-2'>
						<RoomCalendar
							initialBookings={state.rooms[0].bookings}
							title={state.rooms[0].name}
						/>
						<RoomCalendar
							initialBookings={state.rooms[1].bookings}
							title={state.rooms[1].name}
						/>
					</div>
					<div className='flex flex-col items-center m-auto mt-4'>
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
				</div>
		</DateProvider>
	)
}

export default Admin
