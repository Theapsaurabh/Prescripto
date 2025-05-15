import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const About = () => {
  const {docId}= useParams()
  const{doctors}= useContext(AppContext)
  const[docInfo,setDocInfo]= useState(null)
  const fetchDocInfo= async () => {
    const docInfo= doctors.find((doc) => doc.id === docId)
    setDocInfo(docInfo)
    console.log(docInfo)

  }
  useEffect(() => {
    fetchDocInfo()
  }, [docId, doctors])
  return (
    <div>
      
    </div>
  )
}

export default About
