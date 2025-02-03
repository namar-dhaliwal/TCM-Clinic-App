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

	const handleDelete = () => {
		console.log('delete booking')
		onClose()
		dispatch({ type: 'DELETE_BOOKING', payload: { roomId, bookingId: event.id } })
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel='Event Modal'
			style={customStyles}>
			<div className='flex self-end gap-2'>
				<button>Edit</button>
				<button onClick={handleDelete} className='text-red-500'>Delete</button>
			</div>
			<h2>Doctor: {event?.data.doctorName}</h2>
			<h2>Patient: {event?.data.patientName}</h2>
			<div>
				<h2>Other notes</h2>
				<p>{event?.data.otherNotes}</p>
			</div>
		</Modal>
	)
}

export default EventModal
