import { Link, Outlet } from 'react-router-dom'

const Navbar = () => {
	return (
		<div className=''>
			<header>
				<div className='container'>
					<Link to='/'>
						<h1>Home</h1>
					</Link>
					<Link to='/about'>
						<h1>About</h1>
					</Link>
					<Link to='/contact'>
						<h1>Contact Us</h1>
					</Link>
					<Link to='/Treatments'>
						<h1>Treatments</h1>
					</Link>
				</div>
			</header>
      <main>
        <Outlet />
      </main>
		</div>
	)
}

export default Navbar
