import React, { useState } from 'react';
import "./flight.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faPlaneUp } from '@fortawesome/free-solid-svg-icons'

const Flight = ({ flight }) => {
  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const calculateTimeDifference = (departureTime, arrivalTime) => {
    const departure = new Date(departureTime);
    const arrival = new Date(arrivalTime);

    const timeDifference = arrival - departure;

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <div className='time d-flex justify-content-between align-items-center'>
        <p className='fw-bolder mb-0'>{formatTime(flight.departureTime)}</p>
        <p className='text-secondary mb-0' style={{fontSize: "12px"}}><FontAwesomeIcon icon={faClock} /> {calculateTimeDifference(flight.departureTime, flight.arrivalTime)}</p>
        <p className='fw-bolder mb-0'>{formatTime(flight.arrivalTime)}</p>
      </div>

      <div className='flight-line mx-4 d-flex justify-content-between '>
        <hr style={{border: "solid 1px #6c757d", width:"47%"}}/>
        <FontAwesomeIcon icon={faPlaneUp} style={{color: "var(--main-color)", transform: "translateY(-20%)"}} className='align-self-center'/>
        <hr style={{border: "solid 1px #6c757d", width:"47%"}}/>
      </div>

      <div className='d-flex justify-content-between align-items-center px-3'>
        <p className='countries fw-bolder text-secondary mb-0'>{flight.sourceCountry.substring(0, 3)}</p>
        <p className='text-secondary mb-0' style={{fontSize: "12px"}}>Direct</p>
        <p className='countries fw-bolder text-secondary mb-0'>{flight.destinationCountry.substring(0, 3)}</p>
      </div>
    </>
  );
};

export default Flight;