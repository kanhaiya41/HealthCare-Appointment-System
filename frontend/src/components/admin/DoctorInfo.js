import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import URL from '../../utills/utills';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const DoctorInfo = () => {

    const [booked, setBooked] = useState([]);
    const [requests, setRequests] = useState([]);
    const [expired, setExpired] = useState([]);
    const [completed, setCompleted] = useState([]);
    const navigate = useNavigate();

    const { selected } = useSelector(store => store.user);

    useEffect(() => {
        const getDoctorList = async () => {
            try {
                const bookedRes = await axios.get(`${URL}/admin/bookedAppointments/${selected?.name}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                const requestsRes = await axios.get(`${URL}/admin/appointmentRequests/${selected?.name}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                const expiredRes = await axios.get(`${URL}/admin/expiredAppointments/${selected?.name}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                const completedRes = await axios.get(`${URL}/admin/completedMeetings/${selected?.name}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                if (bookedRes?.data?.success && requestsRes?.data?.success && expiredRes?.data?.success && completedRes?.data?.success) {
                    setBooked(bookedRes?.data?.data);
                    setRequests(requestsRes?.data?.data);
                    setExpired(expiredRes?.data?.data);
                    setCompleted(completedRes?.data?.data);
                }
            } catch (error) {
                console.log("while geting doctorlist", error);
            }
        }
        getDoctorList();
    }, []);

    return (
        <>
            <Navbar />
            <div className='profile'>
                <img src={selected?.ProfilePicture} alt="" />
                <h3>{selected?.name}</h3>
            </div>
            <div className='work'>
                <h1 className='avstock' >Booked Appointment:</h1>
                <div className='tabled' style={{ height: '60vh' }} >

                    <table className='sotable'>
                        <thead>
                            <tr className='table-th'>
                                <th className='table-head'>S.N.</th>
                                <th className='table-head'>Name</th>
                                <th className='table-head'>Email</th>
                                <th className='table-head'>Mobile</th>
                                <th className='table-head'>Date</th>
                                <th className='table-head'>time</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                booked && booked.map((curElem, index) => (
                                    <tr className='table-row'>
                                        <td className='table-data'>{index + 1}</td>
                                        <td className='table-data'>{curElem?.name}</td>
                                        <td className='table-data'>{curElem?.email}</td>
                                        <td className='table-data'>{curElem?.mobile}</td>
                                        <td className='table-data'>{new Date(curElem?.date).toISOString().split('T')[0]}</td>
                                        <td className='table-data'>{curElem?.time}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='work'>
                <h1 className='avstock' >Appointment Requests:</h1>
                <div className='tabled' style={{ height: '60vh' }} >

                    <table className='sotable'>
                        <thead>
                            <tr className='table-th'>
                                <th className='table-head'>S.N.</th>
                                <th className='table-head'>Name</th>
                                <th className='table-head'>Email</th>
                                <th className='table-head'>Mobile</th>
                                <th className='table-head'>Date</th>
                                <th className='table-head'>time</th>

                            </tr>

                        </thead>
                        <tbody>
                            {
                                requests && requests.map((curElem, index) => (
                                    <tr className='table-row'>
                                        <td className='table-data'>{index + 1}</td>
                                        <td className='table-data'>{curElem?.name}</td>
                                        <td className='table-data'>{curElem?.email}</td>
                                        <td className='table-data'>{curElem?.mobile}</td>
                                        <td className='table-data'>{new Date(curElem?.date).toISOString().split('T')[0]}</td>
                                        <td className='table-data'>{curElem?.time}</td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='work'>
                <h1 className='avstock' >Expired Requests:</h1>
                <div className='tabled' style={{ height: '60vh' }} >

                    <table className='sotable'>
                        <thead>
                            <tr className='table-th'>
                                <th className='table-head'>S.N.</th>
                                <th className='table-head'>Name</th>
                                <th className='table-head'>Email</th>
                                <th className='table-head'>Mobile</th>
                                <th className='table-head'>Date</th>
                                <th className='table-head'>time</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                expired && expired.map((curElem, index) => (
                                    <tr className='table-row'>
                                        <td className='table-data'>{index + 1}</td>
                                        <td className='table-data'>{curElem?.name}</td>
                                        <td className='table-data'>{curElem?.email}</td>
                                        <td className='table-data'>{curElem?.mobile}</td>
                                        <td className='table-data'>{new Date(curElem?.date).toISOString().split('T')[0]}</td>
                                        <td className='table-data'>{curElem?.time}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='work'>
                <h1 className='avstock' >Completed Meetings:</h1>
                <div className='tabled' style={{ height: '60vh' }} >

                    <table className='sotable'>
                        <thead>
                            <tr className='table-th'>
                                <th className='table-head'>S.N.</th>
                                <th className='table-head'>Name</th>
                                <th className='table-head'>Email</th>
                                <th className='table-head'>Mobile</th>
                                <th className='table-head'>Date</th>
                                <th className='table-head'>time</th>

                            </tr>

                        </thead>
                        <tbody>
                            {
                                completed && completed.map((curElem, index) => (
                                    <tr className='table-row'>
                                        <td className='table-data'>{index + 1}</td>
                                        <td className='table-data'>{curElem?.name}</td>
                                        <td className='table-data'>{curElem?.email}</td>
                                        <td className='table-data'>{curElem?.mobile}</td>
                                        <td className='table-data'>{new Date(curElem?.date).toISOString().split('T')[0]}</td>
                                        <td className='table-data'>{curElem?.time}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <button className='back' onClick={()=>navigate('/doctorPanel')} >Back</button>
        </>
    )
}

export default DoctorInfo
