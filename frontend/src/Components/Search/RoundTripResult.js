import React, { useState } from 'react';
import "./flight.css"
import Flight from "./Flight";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const RoundTripResult = ({ flightData }) => {
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

  return (
    <div>
      {flightData[0].map((flight1, index1) => (
        flightData[1].map((flight2, index2) => (
          <div className='flight border border-1 rounded-2 p-5 pe-0 mb-3 row align-items-center bg-white' key={index1 + '-' + index2}>
            <div className='flight-info col-8'>
              <div className='mb-4'>
                <Flight flight={flight1} />
              </div>
              <div>
                <Flight flight={flight2} />
              </div>
            </div>
            
            <div className='flight-more col-4 h-100 justify-content-end'>
              <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {flight1.baseCost + flight2.baseCost}</h4>
              <p className='text-secondary'><small>Per Person</small></p>
              <button 
                type="button" 
                className="btn rounded-5 text-white px-3 py-2" 
                style={{backgroundColor: "var(--main-color)"}} 
                onClick={() => handleShowModal([flight1, flight2])}
              >
                View Deals
              </button>
            </div>

          </div>
        ))
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

export default RoundTripResult;