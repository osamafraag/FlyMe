import React, { useState } from 'react';
import Flight from "./Flight";
import Transit from "./Transit";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import NoResult from "./../../Assets/Images/NoResult.png"

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
    const flatFlights = selectedFlight.flat();
    const flightIds = flatFlights.map(flight => flight.id).join(',');
    navigate(`/Booking/${flightIds}`);
  }

  return (
    <>
      {flightData.length !== 0 
      ?
      flightData.map((flight, index) => (
        <div className='flight border border-1 rounded-2 p-5 pe-0 mb-3 row align-items-center bg-white' key={index}>
          {Array.isArray(flight) ? (
            <>
              <div className='flight-info col-8'>
                <Transit flights={flight} />
              </div>
              <div className='flight-more col-4 h-100 '>
                {
                  flight[0].offerPercentage == 0 && flight[1].offerPercentage == 0
                    ?
                  <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {flight[0].baseCost + flight[1].baseCost}</h4>
                  :
                  <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {(flight[0].baseCost + flight[1].baseCost) - ((flight[0].baseCost + flight[1].baseCost) * ((flight[0].offerPercentage + flight[1].offerPercentage) / 100))} <small className='fw-normal text-secondary text-decoration-line-through' style={{fontSize: "13px"}}>{flight[0].baseCost + flight[1].baseCost}</small></h4>
                }
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
                {
                  flight.offerPercentage == 0
                  ?
                  <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {flight.baseCost}</h4>
                  :
                  <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {flight.baseCost - (flight.baseCost * (flight.offerPercentage / 100))} <small className='fw-normal text-secondary text-decoration-line-through' style={{fontSize: "13px"}}>{flight.baseCost}</small></h4>

                }
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
        ))
      :
      <div className='d-flex flex-column  justify-content-center align-items-center text-secondary '>
        <h3>Sorry We Couldn't Found Any Result</h3>
        <img src={NoResult} width={400}/>
      </div>
      }

      {selectedFlight && (
        <Modal 
          show={showModal} 
          handleClose={handleCloseModal} 
          handleBooking={() => handleBooking(selectedFlight)} 
          title="Flight Details" 
          flights={selectedFlight} 
        />
      )}
    </>
  );
};

export default OneWayResult;