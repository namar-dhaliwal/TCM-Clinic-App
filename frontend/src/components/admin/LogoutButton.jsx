import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
	const { logout } = useAuth0()

	return (
		<button
			onClick={() => logout()}
			className='border border-black shadow-lg rounded-md px-4 py-1 transition-all hover:translate-y-[-2px] active:translate-y-[1px]'>
			Logout
		</button>
	)
}

export default LogoutButton
