import React from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'

const DoctorDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const doctor = location.state;
    return (
        <>
            <Navbar />
            <div className='doctorDetailsbody'>
                <div className='des'>
                    <h3>Description:</h3>
                    <p>{doctor?.des}</p>
                </div>
                <div>
                    <img src={doctor?.ProfilePicture} alt="doctor" />
                    <button>{doctor?.name}</button>
                </div>
            </div> <br />

            <button className='back' onClick={() => navigate('/doctorPanel')}>Back</button>
        </>
    )
}

export default DoctorDetails
