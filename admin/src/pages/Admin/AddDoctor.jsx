import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
   const [doctorImage, setDoctorImage] =useState(false);
   const[doctorName, setDoctorName] =useState('');
    const[doctorEmail, setDoctorEmail] =useState('');
    const[doctorPassword, setDoctorPassword] =useState('');
    const[doctorExperience, setDoctorExperience] =useState('1 Year');
    const[doctorFee, setDoctorFee] =useState('');
    const[doctorSpeciality, setDoctorSpeciality] =useState('general physician');
    const[doctorEducation, setDoctorEducation] =useState('');
    const[doctorAddress1, setDoctorAddress1] =useState('');
    const[doctorAddress2, setDoctorAddress2] =useState('');
    const[doctorAbout, setDoctorAbout] =useState('');
    const {backend_url, aToken} = useContext(AdminContext);


    const onSubmitHandler=async (event)=>{
      event.preventDefault();
      try{
        if(!doctorImage){
          return toast.error('Image Not Selected');

        }
        const formData = new FormData();
        formData.append('doctorImage', doctorImage);
        formData.append('doctorName', doctorName);
        formData.append('doctorEmail', doctorEmail);
        formData.append('doctorPassword', doctorPassword);
        formData.append('doctorExperience', doctorExperience);
        formData.append('doctorFee',Number(doctorFee) );
        formData.append('doctorSpeciality', doctorSpeciality);
        formData.append('doctorEducation', doctorEducation);
        formData.append('doctorAddress1', doctorAddress1);
        formData.append('doctorAddress2', doctorAddress2);
        formData.append('doctorAbout', doctorAbout);
        // console log fromdata
        formData.forEach((value,key)=>{
          console.log(`${key}:${value}`)
        })
        const {data}= await axios.post(`${backend_url}/admin/add-doctor`, formData, {
          headers: {
            aToken
          }
        });
        if(data.success){
          toast.success(data.message);
          setDoctorImage(false);
          setDoctorName('');
          setDoctorEmail('');
          setDoctorPassword('');
          setDoctorExperience('1 Year');
          setDoctorFee('');
          setDoctorSpeciality('general physician');
          setDoctorEducation('');
          setDoctorAddress1('');
          setDoctorAddress2('');
          setDoctorAbout('');
          
        }else{
          toast.error(data.message);
        }

      }catch(error){
        toast.error(error.message);
        console.error(error);

      }



    }



  return (
    <div>
      <form onSubmit={onSubmitHandler} className="m-5 w-full ">
        <p className="mb-3 text-lg font-medium ">Add Doctor</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
          <div className="flex item-center gap-4 mb-8 text-gray-500">
            <label htmlFor="doc-img">
              <img className="w-16 bg-gray-100 rounded-full cursor-pointer " src={doctorImage ? URL.createObjectURL(doctorImage):  assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setDoctorImage(e.target.files[0])} type="file" id="doc-img" hidden />
            <p>
              Upload doctor <br /> picture{" "}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-start  gap-10 text-gray-500 ">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1 ">
                <p>Doctor Name</p>
                <input onChange={(e)=>setDoctorName(e.target.value)} value={doctorName}  className="border rounded px-3 py-2 " type="text" placeholder="Enter your name" required />
              </div >
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Email</p>
                <input onChange={(e)=>setDoctorEmail(e.target.value)} value={doctorEmail} className="border rounded px-3 py-2 " type="email" placeholder="Enter your Email" required />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Doctor Password</p>
                <input onChange={(e)=>setDoctorPassword(e.target.value)} value={doctorPassword} className="border rounded px-3 py-2 "
                  type="password"
                  placeholder="Enter your Password"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Experience</p>
                <select onChange={(e)=>setDoctorExperience(e.target.value)} value={doctorExperience} className="border rounded px-3 py-2 " name="" id="">
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year">6 Year</option>
                  <option value="7 Year">7 Year</option>
                  <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
                  <option value="10 Year">10 Year</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Fee</p>
                <input onChange={(e)=>setDoctorFee(e.target.value)} value={doctorFee} className="border rounded px-3 py-2 " type="number" placeholder="fees" required />
              </div>
            </div>
            <div>
              <div className="w-full lg:flex-1 flex flec-col gap-4">
                <p>Speciality</p>
                <select onChange={(e)=>setDoctorSpeciality(e.target.value)} value={doctorSpeciality} name="" id="">
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Education</p>
                <input onChange={(e)=>setDoctorEducation(e.target.value)} value={doctorEducation} type="text" placeholder="Education" required />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <p>Address</p>
                <input onChange={(e)=>setDoctorAddress1(e.target.value)} value={doctorAddress1} className="border rounded px-3 py-2 " type="text" placeholder="address 1" required />
                <input onChange={(e)=>setDoctorAddress2(e.target.value)} value={doctorAddress2} className="border rounded px-3 py-2 " type="text" placeholder="address 2" required />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1 mt-8">
            <p className="mt-4 mb-2 ">About Doctor</p>
            <textarea onChange={(e)=>setDoctorAbout(e.target.value)} value={doctorAbout} className="w-full px-4 pt-2 border rounded " placeholder="write about doctor" rows={5} required />
          </div>
          <button type="submit" className="bg-blue-500 px-10 py-3 mt-4 text-white rounded-full ">Add Doctor</button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
