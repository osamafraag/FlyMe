import React, { useState } from 'react';
import "./flight.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import Flight from "./Flight"

const MultiCityResult = ({ flightData }) => {
  let cost = 0
  const combinations = [];

  flightData[0].forEach(flight1 => {
    flightData[1].forEach(flight2 => {
      flightData[2].forEach(flight3 => {
        combinations.push([flight1, flight2, flight3]);
      });
    });
  });

  return (
    <div>
      {combinations.map((combination, index) => (
         <div className='flight border border-1 rounded-2 p-5 pe-0 mb-3 row align-items-center' key={index}>
         <div className='airline-logo col-3'>
           <h5 className='text-start'><FontAwesomeIcon icon={faPlaneDeparture} style={{color: "var(--main-color)"}} /> Fly Me</h5>
         </div>
         
         <div className='flight-info col-6'>
          {combination.map((flight, flightIndex) => (
            <div className='my-4' key={flightIndex}>
              <span className='d-none'>{cost += flight.baseCost}</span>
              <Flight flight={flight} />
            </div>
            ))}
         </div>
         
         <div className='flight-more col-3 h-100 justify-content-end align-self-start'>
           <h4><span className='fw-normal text-secondary fs-6'>EGP</span> 
            {cost}
            <span className='d-none'>{cost = 0}</span>
           </h4>
           <p className='text-secondary'><small>Per Person</small></p>
           <button className='btn rounded-5 text-white px-3 py-2' style={{backgroundColor: "var(--main-color)"}}>
             View Deals
           </button>
         </div>

       </div>
      ))}
    </div>
  );
};

export default MultiCityResult;