import React, {useState, useEffect} from 'react'
import Register from '../Components/Register/Register'

export default function AddSuperUser() {
 
  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary my-4'>Add Super User</h3>
      <Register />
    </div>
  )
}