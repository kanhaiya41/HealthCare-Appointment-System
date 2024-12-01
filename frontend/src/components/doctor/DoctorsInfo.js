import React, { useEffect, useState } from 'react'
import DoctorCard from '../DoctorCard';
import SignIn from '../SignIn';
import axios from 'axios';
import URL from '../../utills/utills';
import { useLocation } from 'react-router-dom';


const DoctorsInfo = () => {
    const ary = [1, 2, 3, 45, 3, 6, 4];
    const [openSign, setOpenSign] = useState(false);
    

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const getDoctorList = async () => {
            try {
                const res = await axios.get(`${URL}/patient/doctors`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                if (res?.data?.success) {
                    setDoctors(res?.data?.doctor);
                }
            } catch (error) {
                console.log("while geting doctorlist", error);
            }
        }
        getDoctorList();
    }, []);

    return (
        <>
            <div className='doctorbody'>
                {
                    openSign && <SignIn setOpenSign={setOpenSign} openSign={openSign} />
                }
                <div className="dpanel">
                    <h1 onClick={() => setOpenSign(!openSign)} >Doctors</h1>
                </div>
                <div className='card-container'>
                    {
                        doctors.map((curElem, index) =>
                            <DoctorCard doctor={curElem} />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default DoctorsInfo
