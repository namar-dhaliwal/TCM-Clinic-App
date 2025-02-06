import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Auth0Provider
				domain='dev-adsaflrv4mgvqg8k.us.auth0.com'
				clientId='3A1mK6xKccexLh6godVwaGm3WeS3HwJU'
				authorizationParams={{
					redirect_uri: 'http://localhost:5173/admin/bookings',
				}}>
				<App />
			</Auth0Provider>
		</BrowserRouter>
	</StrictMode>
)
