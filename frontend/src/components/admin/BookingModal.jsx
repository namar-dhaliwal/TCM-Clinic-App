import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Modal from 'react-modal'

import { useBookingsContext } from '../../context/admin/BookingsContext'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

Modal.setAppElement('#root')

const BookingModal = ({ isOpen, onClose, defaultStart, roomId }) => {
	const { state, dispatch } = useBookingsContext()
	const [patientName, setPatientName] = useState('')
	const [start, setStart] = useState(
		defaultStart ? defaultStart : new Date()
	)
	const [duration, setDuration] = useState(30)
	const [end, setEnd] = useState(new Date(defaultStart + 30 * 60000))

	useEffect(() => {
		if (defaultStart) {
			setStart(defaultStart)
		}
	}, [defaultStart])

	useEffect(() => {
		const newEnd = new Date(start)
		newEnd.setMinutes(start.getMinutes() + duration)
		setEnd(newEnd)
	}, [start, duration])

	const handleSubmit = (e) => {
		e.preventDefault()

		const newBooking = {
			id:
				state.rooms.find((room) => room.id === roomId).bookings.length +
				1,
			title: patientName,
			start,
			end,
		}

		dispatch({
			type: 'ADD_BOOKING',
			payload: {
				roomId,
				booking: newBooking,
			},
		})

		setPatientName('')
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel='Add Booking'
			style={customStyles}>
			<h2>Add Booking</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Patient Name: </label>
					<input
						type='text'
						value={patientName}
						onChange={(e) => setPatientName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Start Time: </label>
					<input
						type='datetime-local'
						value={format(start, "yyyy-MM-dd'T'HH:mm")}
						onChange={(e) => setStart(new Date(e.target.value))}
					/>
				</div>
				<div>
					<label>Duration (minutes): </label>
					<input
						type='text'
						value={duration}
						onChange={(e) => setDuration(Number(e.target.value))}
						required
					/>
				</div>
				<div>
					<label>End Time: </label>
					<input type='datetime-local' value={format(end, "yyyy-MM-dd'T'HH:mm")} readOnly />
				</div>
				<button type='submit'>Save</button>
				<button type='button' onClick={onClose}>
					Cancel
				</button>
			</form>
		</Modal>
	)
}

export default BookingModal
