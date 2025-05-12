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
function App() {
  

  return (
   <div>
    hello
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/appointment/:docId" element={<Appointment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/doctors:speciallity" element={<Doctors />} />
      <Route path="/my-appointments" element={<MyAppointment />} />
      <Route path="/about" element={<About/>} />
      <Route path="contact" element={<Contact/>} />


    </Routes>
   </div>
      
  )
}

export default App
