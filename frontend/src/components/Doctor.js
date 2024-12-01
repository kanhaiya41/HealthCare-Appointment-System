import React, { useState } from 'react'
import Navbar from './Navbar'
import AdminPanel from './admin/AdminPanel'
import DoctorDetails from './DoctorDetails'
import DoctorsInfo from './doctor/DoctorsInfo'
import DoctorPanel from './doctor/DoctorPanel'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import URL from '../utills/utills'
import { setUser } from '../redux/userSlice'
import toast from 'react-hot-toast'



const Doctor = () => {

    const { user } = useSelector(store => store.user);
    const dispath = useDispatch();
    const [loading, setLoading] = useState(false);

    const logOut = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${URL}/auth/logOut`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res?.data?.success) {
                dispath(setUser(null));
                toast.success(res?.data?.message);
            }
            else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log("while logout ", error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            {
                user ? (<>
                    <div className='doctorpanelbody'>
                        <div className='profile'>
                            <img src={user?.ProfilePicture} alt="" />
                            <h3>{user?.name}</h3>
                            {
                                loading ? <button>
                                    <img src="/img/loader.png" className='Loader' alt="loader" />
                                </button>
                                    :
                                    <button onClick={logOut} >LogOut</button>
                            }
                        </div>
                    </div>
                    <div className='fullwork'>
                        {
                            user?.name === 'Host' ?
                                (
                                    <>
                                        <AdminPanel />
                                    </>
                                ) : (
                                    <>
                                        <DoctorPanel />
                                    </>
                                )
                        }
                    </div>
                </>) :

                    <DoctorsInfo />

            }



        </>
    )
}

export default Doctor
