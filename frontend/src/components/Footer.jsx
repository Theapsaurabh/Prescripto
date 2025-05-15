import React from 'react'
import { assets } from '../assets/assets'

const footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_2fr_1fr] gap-14  my-10 mt-40 text-sm text-white'>
    {/*------------Left Section --------- */}
    <div>
        <img className='mb-5 w-40 ' src={assets.logo} alt="" />
        <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia atque adipisci iusto ad. Iste asperiores veritatis blanditiis impedit magni iure aut quos tenetur voluptates. Accusamus reprehenderit voluptates quo nulla dolore.</p>

    </div>
     {/*------------center Section --------- */}
    <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-2 text-gray-400'>
           <li>Home</li>
           <li>About us</li>
           <li>Contact us</li>
           <li>Privacy Policy</li>
        </ul>
    </div>
     {/*------------Right Sector --------- */}
    <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap- text-gray-400'>
            <li>+917355018077</li>
           <li>ampsaurabh@gmail.com</li>

        </ul>
        
    </div>
      </div>
      {/**------Copyright Text----------- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ Prescripto - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default footer
