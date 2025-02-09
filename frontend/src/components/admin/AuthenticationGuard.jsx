import { withAuthenticationRequired } from '@auth0/auth0-react'
import { BookingsProvider } from '../../context/admin/BookingsContext'

export const AuthenticationGuard = ({ component }) => {
	const Component = withAuthenticationRequired(component, {
		onRedirecting: () => <div>Loading...</div>,
	})

	return (
		<BookingsProvider>
			<Component />
		</BookingsProvider>
	)
}
