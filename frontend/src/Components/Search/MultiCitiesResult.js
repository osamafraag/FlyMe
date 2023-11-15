import React, { useState } from 'react';
import "./flight.css"
import Flight from "./Flight"
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const MultiCityResult = ({ flightData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const navigate = useNavigate();

  const handleShowModal = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setSelectedFlight(null);
    setShowModal(false);
  }

  const handleBooking = (selectedFlight) => {
    handleCloseModal();
    const flightIds = selectedFlight.map(flight => flight.id).join(',');
    navigate(`/Booking/${flightIds}`);
  }

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
         <div className='flight border border-1 rounded-2 p-5 pe-0 mb-3 row align-items-center bg-white' key={index}>
         <div className='flight-info col-8'>
          {combination.map((flight, flightIndex) => (
            <div className='my-4' key={flightIndex}>
              <span className='d-none'>{cost += flight.baseCost}</span>
              <Flight flight={flight} />
            </div>
            ))}
         </div>
         
         <div className='flight-more col-4 h-100 justify-content-end'>
           <h4><span className='fw-normal text-secondary fs-6'>EGP </span> 
            {cost}
            <span className='d-none'>{cost = 0}</span>
           </h4>
           <p className='text-secondary'><small>Per Person</small></p>
           <button 
              type="button" 
              className="btn rounded-5 text-white px-3 py-2" 
              style={{backgroundColor: "var(--main-color)"}} 
              onClick={() => handleShowModal(combination)}
            >
              View Deals
            </button>
         </div>

       </div>
      ))}

      {selectedFlight && (
        <Modal 
          show={showModal} 
          handleClose={handleCloseModal} 
          handleBooking={() => handleBooking(selectedFlight)} 
          title="Flight Details" 
          flights={selectedFlight} 
        />
      )}
    </div>
  );
};

export default MultiCityResult;