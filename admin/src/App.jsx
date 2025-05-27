
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


const App = () => {
  const {aToken }= useContext(AdminContext)
  return aToken ? (
    <div className='bg-[#F8F8F8] '>
    <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'> 
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard/>}></Route>
          <Route path='/all-appointment' element={<AllApointment/>}></Route>
          <Route path='/add-doctor' element={<AddDoctor/>}></Route>
          <Route path='/doctor-list' element={<DoctorsList/>}></Route>




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