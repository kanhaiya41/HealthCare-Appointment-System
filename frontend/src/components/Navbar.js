import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='nav'>
                <div>
                    <h3 onClick={() => navigate('/')} ><img src="/img/logo.jpg" alt="" /></h3>
                </div>
                <div>
                    <h3 onClick={() => navigate('/book-appointment')} >AppointMent</h3>
                    <h3 onClick={() => navigate('/doctorPanel')} >Doctor</h3>
                </div>
            </div>
        </>
    )
}

export default Navbar
