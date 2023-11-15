import React from 'react'
import Error404 from './../Assets/Images/404.gif'
import { NavLink } from 'react-router-dom'

export default function Error() {
  return (
    <div  style={{height: "500px"}}>
      <img className='h-75' src={Error404} />
      <br />
      <NavLink className="mt-4" to="/"> &larr; Back To Home</NavLink>
    </div>
  )
}