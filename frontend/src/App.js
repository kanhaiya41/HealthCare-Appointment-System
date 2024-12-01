import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Appointment from './components/Appointment';
import Doctor from './components/Doctor';
import DoctorDetails from './components/DoctorDetails';
import ShceduleReq from './components/doctor/ShceduleReq';
import DoctorInfo from './components/admin/DoctorInfo';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/book-appointment' element={<Appointment />} />
        <Route path='/doctorPanel' element={<Doctor />} />
        <Route path='/doctorPanel/details' element={<DoctorDetails />} />
        <Route path='/doctorPanel/shceduleReqest' element={<ShceduleReq />} />
        <Route path='/Doctor-info' element={<DoctorInfo />} />
      </Routes>
    </>
  );
}

export default App;
