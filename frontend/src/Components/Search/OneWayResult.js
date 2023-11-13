import React, { useState } from 'react';
import Flight from "./Flight";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const OneWayResult = ({ flightData }) => {
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

  return (
    <div>
      {flightData.map((flight, index) => (
      <div className='flight border border-1 rounded-2 p-5 pe-0 mb-3 row align-items-center bg-white' key={index}>
        {Array.isArray(flight) ? (
          <>
            <div className='flight-info col-8'>
              {flight.map((segment, segmentIndex) => (
                <>
                  <span className='d-none'>{cost += Number(segment.baseCost)}</span>
                  <Flight key={segmentIndex} flight={segment} />
                </>
              ))}
            </div>
            <div className='flight-more col-4 h-100 '>
              <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {cost}
                  <span className='d-none'>{cost = 0}</span></h4>
              <p className='text-secondary'><small>Per Person</small></p>
              <button 
                type="button" 
                className="btn rounded-5 text-white px-3 py-2" 
                style={{backgroundColor: "var(--main-color)"}} 
                onClick={() => handleShowModal([flight])}
              >
                View Deals
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='flight-info col-8'>
              <Flight flight={flight} />
            </div>
            <div className='flight-more col-4 h-100 '>
              <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {flight.baseCost}</h4>
              <p className='text-secondary'><small>Per Person</small></p>
              <button 
                type="button" 
                className="btn rounded-5 text-white px-3 py-2" 
                style={{backgroundColor: "var(--main-color)"}} 
                onClick={() => handleShowModal([flight])}
              >
                View Deals
              </button>
            </div>
          </>
        )}
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

export default OneWayResult;