import { useState } from 'react'
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
		console.log('delete booking')
		onClose()
		dispatch({
			type: 'DELETE_BOOKING',
			payload: { roomId, bookingId: event.id },
		})
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

			<div className='flex justify-between'>
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
							<button className='text-green-500'>Save</button>
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
				<>
					<div>
						<label>Doctor: </label>
						<input
							type='text'
							value={formData.doctorName}
							onChange={(e) =>
								setFormData({
									...formData,
									doctorName: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<label>Patient: </label>
						<input
							type='text'
							value={formData.patientName}
							onChange={(e) =>
								setFormData({
									...formData,
									patientName: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<label className='flex flex-col'>Other Notes</label>
						<textarea
							value={formData.otherNotes}
							onChange={(e) => setFormData({
								...formData,
								otherNotes: e.target.value,
							})}></textarea>
					</div>
				</>
			)}
		</Modal>
	)
}

export default EventModal
