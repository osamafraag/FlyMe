import React, { useState } from 'react';
import "./flight.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import Flight from "./Flight"

const OneWayResult = ({ flightData }) => {

  return (
    flightData.map((flight, index) => (
      <div className='flight border border-1 rounded-2 p-5 pe-0 mb-3 row align-items-center' key={index}>
        <div className='airline-logo col-3'>
          <h5 className='text-start'><FontAwesomeIcon icon={faPlaneDeparture} style={{color: "var(--main-color)"}} /> Fly Me</h5>
        </div>
        
        <div className='flight-info col-6'>
          <Flight flight={flight} />
        </div>
        
        <div className='flight-more col-3 h-100 justify-content-end'>
          <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {flight.baseCost}</h4>
          <p className='text-secondary'><small>Per Person</small></p>
          <button className='btn rounded-5 text-white px-3 py-2' style={{backgroundColor: "var(--main-color)"}}>
            View Deals
          </button>
        </div>

      </div>
    ))
  );
};

export default OneWayResult;