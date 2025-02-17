import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Modal from 'react-modal'

import { useBookingsContext } from '../../context/admin/BookingsContext'

import { addBooking } from '../../data/bookingsData'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: '2rem 3rem',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
}

const durationValues = [15, 30, 60, 90, 120]

Modal.setAppElement('#root')

const BookingModal = ({ isOpen, onClose, defaultStart, roomId }) => {
	const { state, dispatch } = useBookingsContext()
	const [doctorName, setDoctorName] = useState('')
	const [patientName, setPatientName] = useState('')
	const [start, setStart] = useState(defaultStart ? defaultStart : new Date())
	const [duration, setDuration] = useState(30)
	const [end, setEnd] = useState(new Date(defaultStart + 30 * 60000))
	const [otherNotes, setOtherNotes] = useState('')

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
			start,
			end,
			data: {
				doctorName,
				patientName,
				otherNotes
			},
		}

		addBooking(newBooking)

		dispatch({
			type: 'ADD_BOOKING',
			payload: {
				roomId,
				booking: newBooking,
			},
		})

		onClose()
		setPatientName('')
		setDoctorName('')
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel='Add Booking'
			style={customStyles}>
			<h2 className='font-bold underline text-center mb-8 text-xl'>
				Add Booking
			</h2>
			<form onSubmit={handleSubmit} className='flex flex-col'>
				<div className='flex gap-8'>
					<div className='flex flex-col gap-1 '>
						<div className='flex gap-2'>
							<label>Doctor: </label>
							<input
								type='text'
								value={doctorName}
								onChange={(e) => setDoctorName(e.target.value)}
								required
								className='border border-black rounded-md flex-1 pl-1'
							/>
						</div>
						<div className='flex gap-2'>
							<label>Patient Name: </label>
							<input
								type='text'
								value={patientName}
								onChange={(e) => setPatientName(e.target.value)}
								required
								className='border border-black rounded-md flex-1 pl-1'
							/>
						</div>
						<div className='flex gap-2'>
							<label>Start Time: </label>
							<input
								type='datetime-local'
								value={format(start, "yyyy-MM-dd'T'HH:mm")}
								onChange={(e) =>
									setStart(new Date(e.target.value))
								}
								className='border border-black rounded-md flex-1 pl-1 text-right'
							/>
						</div>
						<div className='flex gap-2'>
							<label>Duration (minutes): </label>
							<select
								value={duration}
								onChange={(e) =>
									setDuration(Number(e.target.value))
								}
								className='border border-black rounded-md flex-1 pl-1 text-right'>
								{durationValues.map((value) => (
									<option key={value} value={value}>
										{value}
									</option>
								))}
							</select>
						</div>
						<div className='flex gap-2'>
							<label>End Time: </label>
							<input
								type='datetime-local'
								value={format(end, "yyyy-MM-dd'T'HH:mm")}
								readOnly
								className='border border-gray-400 rounded-md flex-1 pl-3 text-center'
							/>
						</div>
					</div>

					<div className='flex flex-col'>
						<label className='text-center underline'>Other Notes</label>
						<textarea
							value={otherNotes}
							onChange={(e) => setOtherNotes(e.target.value)}
							className='border border-black rounded-md flex-1 pl-1  min-w-72 '
						/>
					</div>
				</div>

				<div className='m-auto flex gap-4 mt-4'>
					<button
						type='submit'
						className='border rounded-md border-green-600 px-4 py-1 text-green-600'>
						Save
					</button>
					<button
						type='button'
						onClick={onClose}
						className='border rounded-md border-black px-4 py-1 '>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default BookingModal
