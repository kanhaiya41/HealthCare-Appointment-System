import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/free-brands-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import URL from '../../utills/utills';
import toast from "react-hot-toast";

const DoctorPanel = () => {

    const navigate = useNavigate();

    const [booked, setBooked] = useState([]);
    const [requests, setRequests] = useState([]);
    const [expired, setExpired] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [fixLoading, setFixLoading] = useState(false);
    const [comLoading, setComLoading] = useState(false);
    const [dltExLoading, setDltExLoading] = useState(false);
    const [dltComLoading, setDltComLoading] = useState(false);

    const { user } = useSelector(store => store.user);

    useEffect(() => {
        const getDoctorList = async () => {
            try {
                const bookedRes = await axios.get(`${URL}/admin/bookedAppointments/${user?.name}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                const requestsRes = await axios.get(`${URL}/admin/appointmentRequests/${user?.name}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                const expiredRes = await axios.get(`${URL}/admin/expiredAppointments/${user?.name}`, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                const completedRes = await axios.get(`${URL}/admin/completedMeetings/${user?.name}`, {
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

    const fixAppointment = async (curElem) => {
        try {
            setFixLoading(true);
            const res = await axios.post(`${URL}/doctor/fixAppointment`, curElem, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log("while fix appointment", error);
        }
        finally {
            setFixLoading(false);
        }
    }
    const completeMeeting = async (curElem) => {
        try {
            setComLoading(true);
            const res = await axios.post(`${URL}/doctor/completeMeeting`, curElem, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log("while completing appointment", error);
        }
        finally {
            setComLoading(false);
        }
    }

    const deleteExpiredAppointments = async (id) => {
        try {
            setDltExLoading(true);
            const res = await axios.delete(`${URL}/doctor/deleteExpiredAppointments/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log("while deleting expired appointment", error);
        }
        finally {
            setDltExLoading(false);
        }
    }

    const deleteCompletedMeeting = async (id) => {
        try {
            setDltComLoading(true);
            const res = await axios.delete(`${URL}/doctor/deleteCompletedMeeting/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log("while deleting expired appointment", error);
        }
        finally {
            setDltComLoading(false);
        }
    }

    return (
        <>
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
                                <th className='table-head'>Action</th>
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
                                        <td className='table-data'>
                                            {
                                                comLoading ? <button>
                                                    <img src="/img/loader.png" className='Loader' alt="loader" />
                                                </button>
                                                    :
                                                    <FontAwesomeIcon cursor={'pointer'} color='green' onClick={() => completeMeeting(curElem)} icon={faThumbsUp} />
                                            }
                                        </td>
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
                                <th className='table-head'>Action</th>

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
                                        <td className='table-data' >
                                            <FontAwesomeIcon cursor={'pointer'} style={{ marginRight: '15%' }} color='gold' onClick={() => navigate('/doctorPanel/shceduleReqest', { state: { id: curElem?._id } })} icon={faEdit} />
                                            {
                                                fixLoading ? <button style={{ marginLeft: '15%' }}>
                                                    <img src="/img/loader.png" className='Loader' alt="loader" />
                                                </button>
                                                    :
                                                    <FontAwesomeIcon cursor={'pointer'} style={{ marginLeft: '15%' }} color='green' icon={faThumbsUp} onClick={() => fixAppointment(curElem)} />
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='work'>
                <h1 className='avstock' >Expired Appointments:</h1>
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
                                <th className='table-head'>Action</th>
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
                                        <td className='table-data'>
                                            {
                                                dltExLoading ? <button>
                                                    <img src="/img/loader.png" className='Loader' alt="loader" />
                                                </button>
                                                    :
                                                    <FontAwesomeIcon cursor={'pointer'} color='red' icon={faTrash} onClick={() => deleteExpiredAppointments(curElem?._id)} />
                                            }
                                        </td>
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
                                <th className='table-head'>Action</th>

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
                                        <td className='table-data'>
                                            {
                                                dltComLoading ? <button>
                                                    <img src="/img/loader.png" className='Loader' alt="loader" />
                                                </button>
                                                    :
                                                    <FontAwesomeIcon cursor={'pointer'} color='red' icon={faTrash} onClick={() => deleteCompletedMeeting(curElem?._id)} />
                                            }</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DoctorPanel
