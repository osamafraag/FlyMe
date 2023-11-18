import Error404 from './../Assets/Images/404.gif'
import { NavLink } from 'react-router-dom'
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Error() {
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
    <div  style={{height: "570px"}}>
      <img  style={{height: "530px"}} src={Error404} alt=''/>
      <br />
      <NavLink className="mt-4" to="/"> &larr; Back To Home</NavLink>
    </div>
  )
}