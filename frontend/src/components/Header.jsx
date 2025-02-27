import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav class="flex justify-end items-center text-[22px] p-5">
            <img class="size-20 mr-auto" src="./assets/placeholder-logo.svg" alt="placeholder logo"></img>
            <div class="flex gap-10 pr-10">
                <Link to="/about">
                    <h2>About us</h2>
                </Link>
                <Link to="/treatments">
                    <h2>Treatments</h2>
                </Link>
                <Link to ="/contact">
                    <h2>Contact</h2>
                </Link>
                <h2>Review</h2>
                <h2>Booking</h2>               
            </div>
        </nav>
    )
}

export default Header