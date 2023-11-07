import React from 'react'
import "./Booking.css"
import SideBar from './SideBar'
import BookingSteps from './BookingSteps/BookingSteps'

export default function BookingComponent() {

  return (
    <div className='bookingPage w-100 text-start row'>
      <div className='col-8'>
        {/* loginContainer */}
        <div className='Container loginContainer container d-flex justify-content-between align-items-center'>
          <div>
            <p className='mb-2'>Login to book faster!</p>
            <p className='Note py-0 my-0'>Autofill forms with your saved details.</p>
          </div>
          <button className='btn custom-btn'>Sign in</button>
        </div>
        <br />
        {/* Booking Steps: */}
        <BookingSteps />
      </div>
      {/* Side Bar */}
      <SideBar />
    </div>
  )
}