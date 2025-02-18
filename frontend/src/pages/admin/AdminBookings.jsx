import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'
import { useState } from 'react'

// components
import LogoutButton from '../../components/admin/LogoutButton'
import RoomCalendar from '../../components/admin/RoomCalendar'

// context / providers
import { DateProvider } from '../../context/admin/DateContext'

const Admin = () => {
	const { user, logout } = useAuth0()
	const [ view, setView ] = useState('day')

	const roles = user?.['https://tcm-clinic/roles'] || []
	if (!roles.includes('TCM Clinic Admin')) {
		logout()
		return <Navigate to='/admin/login' replace />
	}

	return (
		<DateProvider>
				<div className='flex flex-col w-screen pt-4'>
					<div className='flex self-end mr-8'>
						<LogoutButton />
					</div>
					<div className='flex flex-wrap w-full justify-evenly gap-2'>
						<RoomCalendar
							roomId='1'
							view={view}
							setView={setView}
						/>
						<RoomCalendar
							roomId='2'
							view={view}
							setView={setView}
						/>
					</div>
				</div>
		</DateProvider>
	)
}

export default Admin
