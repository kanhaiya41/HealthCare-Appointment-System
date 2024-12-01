import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate=useNavigate();

    return (
        <>
            <div className='homebody'>
                <Navbar />
                <div className='home'>
                    <div className='homecontainer'>
                        <div>
                            <h2>We are here to help you.</h2>
                            <h3>We have the Best Doctors.</h3>
                            <h4>Be Fit Always</h4>
                        </div>
                        <button onClick={()=>navigate('/book-appointment')} >Book Appointment</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
