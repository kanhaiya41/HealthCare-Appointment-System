import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorCard = ({ doctor }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className='card'>
                <img src={doctor?.ProfilePicture} alt="doctor" />
                <div><h3>{doctor?.name}</h3>
                    <button onClick={() => navigate('/doctorPanel/details', { state: doctor })} >See Details</button></div>
            </div>
        </>
    )
}

export default DoctorCard
