import Airport from '../Components/Airport/Airport'
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Airports() {
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
  }, [userData, navigate]);
  
  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary my-3'>Airports</h3>
      <Airport/>
    </div>
  )
}