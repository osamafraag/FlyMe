import React, { useEffect, useState } from 'react'
import "./Booking.css"
import SideBar from './SideBar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Step1 from './BookingSteps/Step1';
import Step2 from './BookingSteps/Step2';
import Step3 from './BookingSteps/Step3';


export default function BookingComponent() {
  const [insurance, setInsurance] = useState(0)
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
  const handleInsuranceFareChange = (insuranceFare) => {
    // Handle the insurance fare change here, e.g., update state
    console.log("Insurance Fare changed:", insuranceFare);
    setInsurance(insuranceFare)
  };

  
  return (
    <div className='bookingPage w-100 text-start row'>
      <div className='col-8'>
        {/* Booking Steps: */}
        <Step1/>
        <Step2 onInsuranceFareChange={handleInsuranceFareChange}/>
        <Step3 />
      </div>
      {/* Side Bar */}
      <SideBar insurance={insurance}/>
    </div>
  )
}