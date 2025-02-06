import { Routes, Route } from 'react-router-dom'
import './index.css'

// route guards
import { AuthenticationGuard } from './components/admin/AuthenticationGuard'

// pages & components
import Home from './pages/Home'
import About from './pages/AboutUs'
import Contact from './pages/Contact'
import Treatments from './pages/Treatments'
import Header from './components/Header'
import AdminLogin from './pages/AdminLogin'
import AdminBookings from './pages/AdminBookings'

function App() {
	return (
		<div className='App'> 
				<Routes>
					<Route path='/' element={<Header />}>
						<Route index element={<Home />} />
						<Route path='about' element={<About />} />
						<Route path='contact' element={<Contact />} />
						<Route path='treatments' element={<Treatments />} />
					</Route>

          <Route path='/admin'>
            <Route path='login' element={<AdminLogin />} />
            <Route path='bookings' element={<AuthenticationGuard component={AdminBookings} />} />
          </Route>
				</Routes>
		</div>
	)
}

export default App
