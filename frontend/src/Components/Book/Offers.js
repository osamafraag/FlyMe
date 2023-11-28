import React, { useState, useEffect } from 'react';
import { FlightOffers } from './../../APIs/Offers';
import Flight from "./../Search/Flight";
import Transit from "./../Search/Transit";
import { useNavigate } from "react-router-dom";
import Modal from "./../Search/Modal";
import NoResult from "./../../Assets/Images/NoResult.png"

export default function Offers() {
  const [flightOffers, setFlightOffers] = useState([]);
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

  useEffect(() => {
    FlightOffers()
    .then((result) => {
      console.log(result.data.data);
      setFlightOffers(result.data.data);
    })
    .catch((error) => {
      console.error('Error fetching flight offers:', error);
    });
  }, []);
  return (
    <div>
      {flightOffers.length !== 0 
      ?
      flightOffers.map((flight, index) => (
        <div className='flight border border-1 rounded-2 p-5 pe-0 mb-3 row align-items-center bg-white' key={index}>
          <div className='flight-info col-8'>
            <Flight flight={flight} />
          </div>
          <div className='flight-more col-4 h-100 '>
            <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {flight.baseCost - (flight.baseCost * (flight.offerPercentage / 100))} <small className='fw-normal text-secondary text-decoration-line-through' style={{fontSize: "13px"}}>{flight.baseCost}</small></h4>
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
        </div>
        ))
      :
      <div className='d-flex flex-column  justify-content-center align-items-center text-secondary '>
        <h3>Sorry There Is No Offers Now</h3>
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
    </div>
  )
}