import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileComponent from './../Components/Profile/Profile'

export default function Profile() {
  const token = useSelector(state => state.Token.token) || {};
  const userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
      return;
    }
  }, [userData, navigate, token])
  return (
    <div>
      <ProfileComponent userData={userData} token={token} />
    </div>
  )
}