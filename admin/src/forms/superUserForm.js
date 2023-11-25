import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Register from '../Components/Register/Register'
import { useSelector } from 'react-redux';

export default function AddSuperUser() {
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
      <h3 className='text-start text-secondary my-4'>Add Super User</h3>
      <Register />
    </div>
  )
}