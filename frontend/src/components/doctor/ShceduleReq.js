import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import URL from '../../utills/utills';
import toast from 'react-hot-toast'

const ShceduleReq = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state;

    const [formData, setFormData] = useState({
        appointmentDate: "",
        appointmentTime: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const date = formData?.appointmentDate;
            const time = formData?.appointmentTime;
            const res = await axios.post(`${URL}/doctor/shceduleAppointment`, { id, date, time }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                navigate('/doctorPanel');
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log("while shcedule requests", error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
                <div className="appointment-panel">
                    <h2>Book Your Appointment</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="appointmentDate">Date</label>
                            <input
                                type="date"
                                id="appointmentDate"
                                name="appointmentDate"
                                value={formData.appointmentDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="appointmentTime">Time</label>
                            <input
                                type="time"
                                id="appointmentTime"
                                name="appointmentTime"
                                value={formData.appointmentTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button type="submit">Book Appointment</button>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default ShceduleReq
