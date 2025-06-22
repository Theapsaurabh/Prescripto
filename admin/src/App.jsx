
import React from 'react'
import Login from './pages/login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar'
import Sidebar from './components/sidebar'
import {Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllApointment from './pages/Admin/AllApointment';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';


const App = () => {
  const {aToken }= useContext(AdminContext)
  const {dToken}= useContext(DoctorContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F8F8] '>
    <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'> 
        <Sidebar/>
        <Routes>
          {/*-------------- ADMIN ROUTE---------------------------------->*/ }
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard/>}></Route>
          <Route path='/all-appointment' element={<AllApointment/>}></Route>
          <Route path='/add-doctor' element={<AddDoctor/>}></Route>
          <Route path='/doctor-list' element={<DoctorsList/>}></Route>
           {/*.-----------------  DOCTOR ROUTE--------------------->*/ }
           <Route path='/doctor-dashboard' element={<DoctorDashboard/>}></Route>
          <Route path='/doctor-appointment' element={<DoctorAppointments/>}></Route>
          <Route path='/doctor-profile' element={<DoctorProfile/>}></Route>


          

s




        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login />
      <ToastContainer/>
    </>
  )
};

export default App;