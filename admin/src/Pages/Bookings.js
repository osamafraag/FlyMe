import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Bookings from '../Components/Bookings/Bookings'

export default function Booking() {
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      navigate('/Login');
    }
  }, [userData, navigate]);

  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary'>Bookings</h3>
      <Bookings/>
    </div>
  )
}