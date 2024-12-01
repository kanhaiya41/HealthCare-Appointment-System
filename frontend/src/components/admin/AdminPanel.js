import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faThumbsUp, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import URL from '../../utills/utills';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setSeleted } from '../../redux/userSlice';

const AdminPanel = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dltLoading, setDltLoading] = useState(false);

    const { selected } = useSelector(store => store.user);

    const [formData, setFormData] = useState({
        patientName: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        Address: "",
        des: ""
    });
    const [image, setImage] = useState(null);

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
            if (formData.patientName && formData.email && formData.phone && formData.password && formData.cpassword && formData.Address) {
                if (formData.password === formData.cpassword) {
                    const data = new FormData();
                    data.append("name", formData.patientName);
                    data.append("email", formData.email);
                    data.append("mobile", formData.phone);
                    data.append("password", formData.password);
                    data.append("address", formData.Address);
                    data.append("ProfilePicture", image);
                    data.append("des", formData.des);
                    const res = await axios.post(`${URL}/admin/newDoctor`, data, {
                        headers: {
                            'Content-Type': 'maltipart/form-data'
                        }
                    });
                    if (res?.data?.success) {
                        toast.success(res?.data?.message);
                        setFormData({
                            patientName: "",
                            email: "",
                            phone: "",
                            password: "",
                            cpassword: "",
                            Address: "",
                        });
                    }
                    else {
                        toast.error(res?.data?.message);
                    }
                }
                else {
                    toast.error('confirm password does not match!');
                }
            } else {
                toast.error("Please fill out all fields.");
            }
        } catch (error) {
            console.log("while add doctor", error);
        }
        finally {
            setLoading(false);
        }
    };

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

    const gotoInfo = (data) => {
        dispatch(setSeleted(data));
        navigate('/Doctor-info');
    }

    const deleteDoctor = async (id) => {
        try {
            setLoading(true);
            const res = await axios.get(`${URL}/admin/deleteDoctor/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
            else {
                toast.error(res?.data?.error);
            }
        } catch (error) {
            console.log("while deleting doctor", error);
        }
        finally {
            setLoading(false);
        }
    }
    const [id, setId] = useState('');

    const setData = (curElem) => {
        try {
            setFormData({
                patientName: curElem?.name,
                email: curElem?.email,
                phone: curElem?.mobile,
                Address: curElem?.address,
                des: curElem?.des
            });
            setId(curElem?._id);
            setToggle(!toggle);
        } catch (error) {
            console.log("while editing profile", error);
        }
    }

    const editProfile = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = new FormData();
            if (formData.password) {
                if (formData.password === formData.cpassword) {
                    data.append("password", formData.password);
                }
                else {
                    toast.error('Confirm password does not match!');
                }
            }
            if (formData.email) {
                data.append("email", formData.email);
            }
            if (formData.phone) {
                data.append("mobile", formData.phone);
            }
            if (formData.patientName) {
                data.append("name", formData.patientName);
            }
            if (formData.Address) {
                data.append("address", formData.Address);
            }
            if (image) {
                data.append("ProfilePicture", image);
            }
            if (formData.des) {
                data.append("des", formData.des);
            }
            if (id) {
                data.append("id", id);
            }

            const res = await axios.post(`${URL}/admin/editprofile`, data, {
                headers: {
                    'Content-Type': 'maltipart/form-data'
                }
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
            }
            else {
                toast.error(res?.data?.message);
            }

        } catch (error) {
            console.log("while editing profile", error);
        }
        finally {
            setToggle(!toggle);
            setFormData({
                patientName: "",
                email: "",
                phone: "",
                password: "",
                cpassword: "",
                Address: "",
                des: ""
            });
            setImage(null);
            setLoading(false);
        }
    }

    return (
        <>

            <div className="appointment-panel">
                <h2>Join new Doctor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="patientName">Name</label>
                        <input
                            type="text"
                            id="patientName"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleChange}
                            placeholder="Enter name"
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
                            placeholder="Enter email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="appointmentDate">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Set a Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="appointmentTime">Confirm Password</label>
                        <input
                            type="password"
                            id="cpassword"
                            name="cpassword"
                            placeholder="Confirm Password"
                            value={formData.cpassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Address</label>
                        <input
                            type='text'
                            id="Address"
                            name="Address"
                            value={formData.Address}
                            placeholder="Enter Address"
                            onChange={handleChange}
                            required
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="">Profile Picture</label>
                        <input type="file" id="file" name="file" style={{ display: 'none' }} required onChange={(e) => setImage(e.target.files[0])} />
                        <label className='fillbl' htmlFor="file">{image ? image?.name : 'choose from device...'}</label>

                    </div>
                    <div className="form-group">
                        <label htmlFor="">Description</label>
                        <textarea id="Address"
                            name="des"
                            value={formData.des}
                            placeholder="Put description(achivements and education)"
                            onChange={handleChange}
                            required
                        />

                    </div>
                    {
                        loading ? <button>
                            <img src="/img/loader.png" className='Loader' alt="loader" />
                        </button>
                            : (
                                <>
                                    {
                                        toggle ?
                                            <button onClick={editProfile}>Update Profile</button> :
                                            <button type="submit">Add Now</button>
                                    }
                                </>
                            )

                    }
                </form>
            </div >
            <div className='work'>
                <h1 className='avstock' >Total Doctors:</h1>
                <div className='tabled' style={{ height: '60vh' }} >

                    <table className='sotable'>
                        <thead>
                            <tr className='table-th'>
                                <th className='table-head'>S.N.</th>
                                <th className='table-head'>Name</th>
                                <th className='table-head'>Email</th>
                                <th className='table-head'>Mobile</th>
                                <th className='table-head'>Address</th>
                                <th className='table-head'>Action</th>

                            </tr>

                        </thead>
                        <tbody>
                            {
                                doctors && doctors.map((curElem, index) => (
                                    <tr className='table-row' >
                                        <td className='table-data' onClick={() => gotoInfo(curElem)} style={{ cursor: 'pointer' }}  >{index + 1}</td>
                                        <td className='table-data' onClick={() => gotoInfo(curElem)} style={{ cursor: 'pointer' }} >{curElem?.name}</td>
                                        <td className='table-data' onClick={() => gotoInfo(curElem)} style={{ cursor: 'pointer' }} >{curElem?.email}</td>
                                        <td className='table-data' onClick={() => gotoInfo(curElem)} style={{ cursor: 'pointer' }} >{curElem?.mobile}</td>
                                        <td className='table-data' onClick={() => gotoInfo(curElem)} style={{ cursor: 'pointer' }} >{curElem?.address}</td>
                                        <td className='table-data'>
                                            <FontAwesomeIcon cursor={'pointer'} style={{ marginRight: '15%' }} color='gold' onClick={() => setData(curElem)} icon={faEdit} />
                                            {
                                                dltLoading ? <button>
                                                    <img src="/img/loader.png" className='Loader' alt="loader" />
                                                </button>
                                                    :
                                                    <FontAwesomeIcon cursor={'pointer'} style={{ marginLeft: '15%' }} color='red' onClick={() => deleteDoctor(curElem?._id)} icon={faTrashAlt} />
                                            }
                                        </td>
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

export default AdminPanel
