import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-brands-svg-icons'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import URL from '../utills/utills';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const SignIn = ({ setOpenSign, openSign }) => {

    const dispath = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    useEffect(() => {
        document.getElementById("signInBox").classList.add('animate');

    }, []);

    const [loading, setLoading] = useState(false);

    const signIn = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${URL}/auth/login`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success) {
                toast.success(res?.data?.message);
                dispath(setUser(res?.data?.user))
            }
        } catch (error) {
            console.log("while sign in", error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='sign-in-box' id='signInBox'>
                <div className="appointment-panel">
                    <span onClick={() => setOpenSign(!openSign)} ><FontAwesomeIcon icon={faClose} /></span>
                    <h2>Sign In</h2>
                    <form>
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
                            <label htmlFor="email">Password</label>
                            <input
                                type="password"
                                id="email"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your Password"
                                required
                            />
                        </div>
                        {
                            loading ? <button>
                                <img src="/img/loader.png" className='Loader' alt="loader" />
                            </button>
                                :
                                <button type="submit" onClick={signIn} >Sign In</button>
                        }
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignIn
