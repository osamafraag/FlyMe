import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

const OneWayResult = ({ flightData }) => {

  return (
    flightData.map((flight, index) => (
      <div className='border border-1 rounded-2 p-5 mb-3 row' key={index}>
        <div className='airline-logo col-3'>
          <h5 className='text-start'><FontAwesomeIcon icon={faPlaneDeparture} style={{color: "var(--main-color)"}} /> Fly Me</h5>
        </div>
        {flight.name}

      </div>
    ))
  );
};

export default OneWayResult;