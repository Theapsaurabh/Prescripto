import { Route, Routes } from "react-router-dom"

import Appointment from "./pages/Appointment"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Doctors from "./pages/Doctors"
import MyProfile from "./pages/MyProfile"
import MyAppointment from "./pages/MyAppointment"
import About from "./pages/About"
import Contact from  "./pages/Contact"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  

  return (
   <div className="mx-4 sm:mx-[10%]">
    <ToastContainer/>
   
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/appointment/:docId" element={<Appointment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/doctors/:speciality" element={<Doctors />} />
      <Route path="//my-appintment" element={<MyAppointment />} />
      <Route path="/about" element={<About/>} />
      <Route path="contact" element={<Contact/>} />


    </Routes>
    <Footer/>
   </div>
      
  )
}

export default App
