import { useState } from 'react'
import Modal from 'react-modal'

import { useBookingsContext } from '../../context/admin/BookingsContext'

import { updateBooking, removeBooking } from '../../data/BookingsData'

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

Modal.setAppElement('#root')

const EventModal = ({ event, isOpen, onClose, roomId }) => {
	if (!event) {
		return null
	}

	const { dispatch } = useBookingsContext()
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({
		doctorName: event.data.doctorName,
		patientName: event.data.patientName,
		otherNotes: event.data.otherNotes,
	})

	const handleDelete = () => {
		onClose()

		const data = {
			roomId,
			bookingId: event.id,
		}

		removeBooking(data)

		dispatch({
			type: 'DELETE_BOOKING',
			payload: { roomId, bookingId: event.id },
		})
	}

	const handleUpdateBooking = () => {
		const updatedBooking = {
			...event,
			data: {
				doctorName: formData.doctorName,
				patientName: formData.patientName,
				otherNotes: formData.otherNotes,
			},
			roomId
		}

		updateBooking(updatedBooking)

		dispatch({
			type: 'EDIT_BOOKING',
			payload: {
				roomId,
				booking: updatedBooking,
			},
		})
		setIsEditing(false)
		onClose()
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel='Event Modal'
			style={customStyles}>
			<div>
				<h2>{event.start.toDateString()}</h2>
				<p>
					{event.start.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					})}{' '}
					-{' '}
					{event.end.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</p>
			</div>

			<div className='flex min-w-[20rem] justify-between'>
				<h2 className='text-center text-xl underline underline-offset-1'>
					Booking Details
				</h2>
				<div className='flex self-end gap-2'>
					{!isEditing ? (
						<>
							<button onClick={() => setIsEditing(true)}>
								Edit
							</button>
							<button
								onClick={handleDelete}
								className='text-red-500'>
								Delete
							</button>
						</>
					) : (
						<>
							<button onClick={() => setIsEditing(false)}>
								Cancel
							</button>
							<button
								onClick={handleUpdateBooking}
								className='text-green-500'>
								Save
							</button>
						</>
					)}
				</div>
			</div>

			{!isEditing ? (
				<>
					<h3>
						<span className='font-bold'>Doctor:</span>{' '}
						{event?.data.doctorName}
					</h3>
					<h3>
						<span className='font-bold'>Patient:</span>{' '}
						{event?.data.patientName}
					</h3>
					<div className='mt-2'>
						<h3 className='font-bold underline'>Other Notes</h3>
						<p>{event?.data.otherNotes}</p>
					</div>
				</>
			) : (
				<div className='flex flex-col gap-1'>
					<div className='flex gap-2'>
						<label className='font-bold'>Doctor: </label>
						<input
							type='text'
							defaultValue={event.data.doctorName}
							onChange={(e) =>
								setFormData({
									...formData,
									doctorName: e.target.value,
								})
							}
							className='border border-black rounded-md pl-1 flex-1'
						/>
					</div>
					<div className='flex gap-2'>
						<label className='font-bold'>Patient: </label>
						<input
							type='text'
							defaultValue={event.data.patientName}
							onChange={(e) =>
								setFormData({
									...formData,
									patientName: e.target.value,
								})
							}
							className='border border-black rounded-md pl-1 flex-1'
						/>
					</div>
					<div>
						<label className='font-bold underline'>Other Notes</label>
						<textarea
							defaultValue={event.data.otherNotes}
							onChange={(e) =>
								setFormData({
									...formData,
									otherNotes: e.target.value,
								})
							}
							className='w-full border border-black rounded-md pl-1'
						/>
					</div>
				</div>
			)}
		</Modal>
	)
}

export default EventModal
