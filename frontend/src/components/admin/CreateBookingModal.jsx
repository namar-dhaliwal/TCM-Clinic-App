import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Modal from 'react-modal'

import { useBookingsContext } from '../../context/admin/BookingsContext'

import { addBooking } from '../../data/BookingsData'
import CustomDatetimeSelect from './CustomDateTimeSelect'

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

const CreateBookingModal = ({ isOpen, onClose, defaultStart, roomId }) => {
	const { dispatch } = useBookingsContext()
	const [doctorName, setDoctorName] = useState('')
	const [patientName, setPatientName] = useState('')
	const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
	const [startHour, setStartHour] = useState('09')
	const [startMinutes, setStartMinutes] = useState('00')
	const [startPeriod, setStartPeriod] = useState('AM')
	const [duration, setDuration] = useState(30)
	const [end, setEnd] = useState(new Date(defaultStart + 30 * 60000))
	const [otherNotes, setOtherNotes] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		if (defaultStart) {
			setDate(format(defaultStart, 'yyyy-MM-dd'))
			setStartHour(
				String(
					defaultStart.getHours() -
						(defaultStart.getHours() > 12 ? 12 : 0)
				).padStart(2, '0')
			)
			setStartMinutes(String(defaultStart.getMinutes()).padStart(2, '0'))
			setStartPeriod(defaultStart.getHours() >= 12 ? 'PM' : 'AM')
		}
	}, [defaultStart])

	useEffect(() => {
		setEnd(new Date(getDateTime().getTime() + duration * 60000))
	}, [date, startHour, startMinutes, startPeriod, duration])

	const getDateTime = () => {
		let hours24 = parseInt(startHour, 10)
		if (startPeriod === 'PM' && hours24 !== 12) hours24 += 12
		if (startPeriod === 'AM' && hours24 === 12) hours24 = 0

		return new Date(
			`${date}T${String(hours24).padStart(2, '0')}:${startMinutes}`
		)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const newBooking = {
			roomId,
			start: getDateTime(),
			end,
			data: {
				doctorName,
				patientName,
				otherNotes,
			},
		}

		try {
			const addedBooking = await addBooking(newBooking)

			dispatch({
				type: 'ADD_BOOKING',
				payload: {
					roomId,
					booking: addedBooking,
				},
			})

			onClose()
			setPatientName('')
			setDoctorName('')
			setOtherNotes('')
		} catch (err) {
			setError(err.message)

			setTimeout(() => {
				setError('')
			}, 5000)
		}
	}

	const handleCancel = (e) => {
		e.preventDefault()
		onClose()
		setPatientName('')
		setDoctorName('')
		setOtherNotes('')
		setDuration(30)
		setError('')
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel='Add Booking'
			style={customStyles}>
			<h2 className='font-bold underline text-center mb-2 text-xl'>
				Add Booking
			</h2>
			{error && (
				<div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
					{error}
				</div>
			)}
			<form onSubmit={handleSubmit} className='flex flex-col'>
				<div className='flex gap-8'>
					<div className='flex flex-col gap-1 '>
						<div className='flex gap-2'>
							<label>Date:</label>
							<input
								type='date'
								value={date}
								readOnly
								disabled
								className='border border-gray-400 text-gray-500 rounded-md pl-1 text-center flex-1'
							/>
						</div>
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
						<CustomDatetimeSelect
							date={date}
							setDate={setDate}
							hour={startHour}
							setHour={setStartHour}
							minutes={startMinutes}
							setMinutes={setStartMinutes}
							period={startPeriod}
							setPeriod={setStartPeriod}
							error={error}
						/>
						<div className='flex gap-2'>
							<label>Duration (minutes): </label>
							<select
								value={duration}
								onChange={(e) =>
									setDuration(Number(e.target.value))
								}
								className={`border border-black rounded-md flex-1 pl-1 text-center ${
									error
										? 'bg-red-100 border border-red-400 text-red-700'
										: ''
								}`}>
								{durationValues.map((value) => (
									<option key={value} value={value}>
										{value}
									</option>
								))}
							</select>
						</div>
						<div className='flex gap-2 mt-2'>
							<label>End: </label>
							<input
								type='datetime-local'
								value={format(end, "yyyy-MM-dd'T'HH:mm")}
								readOnly
								disabled
								className='border border-gray-400 text-gray-500 rounded-md flex-1 pl-3 text-center'
							/>
						</div>
					</div>

					<div className='flex flex-col'>
						<label className='text-center underline'>
							Other Notes
						</label>
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
						onClick={handleCancel}
						className='border rounded-md border-black px-4 py-1 '>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default CreateBookingModal
