import React, { useState } from 'react';
import "./flight.css"
import Flight from "./Flight"
import Transit from "./Transit"
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import NoResult from "./../../Assets/Images/NoResult.png"

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
    const flatFlights = selectedFlight.flat();
    const flightIds = flatFlights.map(flight => flight.id).join(',');
    navigate(`/Booking/${flightIds}`);
  }

  let cost = 0
  let costAfterOffer = 0
  const combinations = [];

  if (Array.isArray(flightData[0])) {
    flightData[0].forEach(flight1 => {
      if (Array.isArray(flightData[1])) {
        flightData[1].forEach(flight2 => {
          if (Array.isArray(flightData[2])) {
            flightData[2].forEach(flight3 => {
              combinations.push([flight1, flight2, flight3]);
            });
          }
        });
      }
    });
  }

  return (
    <div>
      { combinations.length != 0 ? (
        combinations.map((combination, index) => (
          <div className='flight border border-1 rounded-2 p-5 pe-0 mb-3 row align-items-center bg-white' key={index}>
          <div className='flight-info col-8'>
           {combination.map((flight, flightIndex) => (
             <div className='my-4' key={flightIndex}>
              {Array.isArray(flight) ? (
                <>
                  <span className='d-none'>{cost += flight[0].baseCost + flight[1].baseCost}</span>
                  <span className='d-none'>{costAfterOffer += flight[0].baseCost - (flight[0].baseCost * (flight[0].offerPercentage / 100)) + (flight[1].baseCost * (flight[1].offerPercentage / 100)) }</span>
                  <Transit flights={flight} />
                </>
              ) : (
                <>
                  <span className='d-none'>{cost += flight.baseCost}</span>
                  <span className='d-none'>{costAfterOffer += flight.baseCost - (flight.baseCost * (flight.offerPercentage / 100))}</span>
                  <Flight flight={flight} />
                </>
              )}
             </div>
             ))}
          </div>
          
          <div className='flight-more col-4 h-100 justify-content-end'>
            <h4>
              <span className='fw-normal text-secondary fs-6'>EGP </span>{costAfterOffer}
              {cost !== costAfterOffer && 
                <small className='ms-1 fw-normal text-secondary text-decoration-line-through' style={{fontSize: "13px"}}>{cost}</small>
              }
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
       ))
      ) : (
      <div className='d-flex flex-column  justify-content-center align-items-center text-secondary '>
        <h3>Sorry We Couldn't Found Any Result</h3>
        <img src={NoResult} width={400}/>
      </div>
      )}
      

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