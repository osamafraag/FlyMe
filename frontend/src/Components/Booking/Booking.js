import React, { useEffect } from 'react'
import "./Booking.css"
import SideBar from './SideBar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Step1 from './BookingSteps/Step1'

export default function BookingComponent() {
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      navigate('/Login');
    }
  }, [userData, navigate]);

  // Return null if user data is not available
  if (!userData || Object.keys(userData).length === 0) {
    return null;
  }

  
  return (
    <div className='bookingPage w-100 text-start row'>
      <div className='col-8'>
        {/* Booking Steps: */}
        <Step1 />
      </div>
      {/* Side Bar */}
      <SideBar />
    </div>
  )
}