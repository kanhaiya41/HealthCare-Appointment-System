import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
import toast from 'react-hot-toast';
import URL from "../utills/utills";


const Appointment = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        date: "",
        time: "",
        doctor: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { name, email, mobile, date, time, doctor } = formData;
            if (formData.name && formData.email && formData.mobile && formData.date && formData.time && formData.doctor) {
                const res = await axios.post(`${URL}/patient/appointment`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res?.data?.success) {
                    toast.success(res?.data?.message);
                    setFormData({
                        name: "",
                        email: "",
                        mobile: "",
                        date: "",
                        time: "",
                        doctor: "",
                    });
                }
                else {
                    toast.error(res?.data?.message);
                }

            } else {
                toast.error("Please fill out all fields.");
            }
        } catch (error) {
            console.log("while appoint request", error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="appointment-panel">
                <h2>Book Your Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">mobile Number</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="doctor">Select Doctor</label>
                        <select
                            id="doctor"
                            name="doctor"
                            value={formData.doctor}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select a doctor</option>
                            {
                                doctors && doctors.map(curElem => (
                                    <option value={curElem?.name}>{curElem?.name}</option>

                                ))
                            }

                        </select>
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
        </>
    );
};

export default Appointment;
