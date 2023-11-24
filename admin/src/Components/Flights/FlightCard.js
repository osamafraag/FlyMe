import React from 'react'
import "./FlightCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faPlaneUp } from '@fortawesome/free-solid-svg-icons'

export default function FlightCard(props) {

const {flight} = props

  const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false });
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
    
        <div className="justify-content-center align-items-center container">
            <div className='time d-flex justify-content-between align-items-center'>
              <p className='fw-bolder mb-0'><span>{formatTime(flight.departureTime)}</span>
              <br></br>
              <span className='text-secondary mb-0' style={{fontSize: "11px"}}>{flight.departureTime?.split("T")[0]}</span></p>
              <p className='text-secondary mb-0' style={{fontSize: "11px"}}><FontAwesomeIcon icon={faClock} /> {calculateTimeDifference(flight.departureTime, flight.arrivalTime)}</p>
              <p className='fw-bolder mb-0'><span>{formatTime(flight.arrivalTime)}</span><br></br>
              <span className='text-secondary mb-0' style={{fontSize: "11px"}}>{flight.arrivalTime?.split("T")[0]}</span></p>
            </div>
            <div className='flight-line mx-4 d-flex justify-content-between '>
              <hr style={{border: "solid 1px #6c757d", width:"47%"}}/>
              <FontAwesomeIcon icon={faPlaneUp} style={{color: "var(--main-color)", transform: "translateY(-20%)"}} className='align-self-center'/>
              <hr style={{border: "solid 1px #6c757d", width:"47%"}}/>
            </div>
            <div className='d-flex justify-content-between align-items-center container'>
              <p className='countries fw-bolder text-secondary mb-0 me-2'>{flight.from}</p>
              <p className='text-secondary mb-0 mx-3' style={{fontSize: "11px"}}>Direct</p>
              <p className='countries fw-bolder text-secondary mb-0'>{flight.to}</p>
            </div>
        </div>
    
  )
}