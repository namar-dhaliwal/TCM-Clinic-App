import Modal from 'react-modal'

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

const EventModal = ({event, isOpen, onClose}) => {

	if (!event) {
		return null
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel='Event Modal'
			style={customStyles}>
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
