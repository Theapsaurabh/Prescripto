import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
  const navigate= useNavigate()
  const {token,setToken}= useContext(AppContext)
  const [showMenu, setShowMenu]= useState(false)
  const logout= ()=>{
    setToken(false)
    localStorage.removeItem('token')
    
  }
 
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-500 '>
      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer ' src={assets.logo} alt="" />
      <ul className='hidden md:flex items-start  gap-5 font-medium'>
        <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5  bg-blue-700 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors'>
            <li className='py-1'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-blue-700  w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr  className='border-none outline-none h-0.5  bg-blue-700 w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5  bg-blue-700 w-3/5 m-auto hidden' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token ?
           <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt="" />
            <img className='w-2.5 ' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={()=>navigate('my-profile')} className='hover:text-black cursor-pointer '>My Profile</p>
                <p onClick={()=>navigate('my-appintment')} className='hover:text-black cursor-pointer '>My Appointment</p>
                <p onClick={logout} className='hover:text-black cursor-pointer '>Logout</p>
              </div>
            </div>
          </div>
          : <button onClick={()=>navigate('/login')} className='bg-blue-400 text-white px-8 py-3 rounded-full font-light hidden md:block'>Create Account</button>
        }
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden ' src={assets.menu_icon} alt="" />
        {/** ------Mobile Menu-------- */}
       
<div className={`${showMenu ? 'fixed top-0 right-0 w-4/5 h-full' : 'h-0 w-0'} md:hidden z-50 overflow-hidden bg-white shadow-lg transition-all duration-300`}>
  <div className="flex items-center justify-between p-4 border-b border-gray-300">
    <img className="w-32" src={assets.logo} alt="Logo" />
    <img onClick={() => setShowMenu(false)} className="w-6 h-6 cursor-pointer" src={assets.cross_icon} alt="Close" />
  </div>
  <ul className="flex flex-col gap-6 p-6 text-base font-semibold text-gray-700">
    <NavLink to="/" onClick={() => setShowMenu(false)}>
      <li className="cursor-pointer hover:text-blue-600">HOME</li>
    </NavLink>
    <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
      <li className="cursor-pointer hover:text-blue-600">ALL DOCTORS</li>
    </NavLink>
    <NavLink to="/about" onClick={() => setShowMenu(false)}>
      <li className="cursor-pointer hover:text-blue-600">ABOUT</li>
    </NavLink>
    <NavLink to="/contact" onClick={() => setShowMenu(false)}>
      <li className="cursor-pointer hover:text-blue-600">CONTACT</li>
    </NavLink>
  </ul>
</div>
        </div>
      
    </div>
  )
}

export default Navbar
