import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'



const Navbar = () => {
  const {aToken, setAToken} = useContext(AdminContext)
  const {dToken, setDToken} = useContext(DoctorContext)
  const navigate = useNavigate()
  const logout=()=>{
    navigate ('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')

  }
  return (
    <div className='flex justify-between items-center bg-white sm:px-10  border-b shadow-md px-4 py-2'>
      <div className='flex items-center gap-2 text-xs'>
      <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
      <p className='border px-2.5 py-0.5 rounded-full border-gray-600'>{aToken? 'Admin':'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-blue-500 text-white text-sm px-10 py-2 rounded-full'>Logout</button>
      
    </div>
  )
}

export default Navbar
