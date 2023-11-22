import React, { useState } from 'react';
import "./flight.css"
import Flight from "./Flight";
import Transit from "./Transit";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import NoResult from "./../../Assets/Images/NoResult.png"

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
    const flatFlights = selectedFlight.flat();
    const flightIds = flatFlights.map(flight => flight.id).join(',');
    navigate(`/Booking/${flightIds}`);
  }

  return (
    <div>
      {flightData[0].length != 0 || flightData[1].length != 0 ? (
        flightData[0].map((flight1, index1) => (
          flightData[1].map((flight2, index2) => (
            <div className='flight border border-1 rounded-2 p-5 pe-0 mb-3 row align-items-center bg-white' key={index1 + '-' + index2}>
              <div className='flight-info col-8'>
                <div className='mb-4'>
                  {Array.isArray(flight1) ? (
                    <Transit flights={flight1} />
                  ) : (
                    <Flight flight={flight1} />
                  )}
                </div>
                <div>
                  {Array.isArray(flight2) ? (
                    <Transit flights={flight2} />
                  ) : (
                    <Flight flight={flight2} />
                  )}
                </div>                
              </div>

              <div className='flight-more col-4 h-100 justify-content-end'>
                {
                  (Array.isArray(flight1) ? flight1[0].offerPercentage + flight1[1].offerPercentage : flight1.offerPercentage) + (Array.isArray(flight2) ? flight2[0].offerPercentage + flight2[1].offerPercentage : flight2.offerPercentage) == 0
                    ?
                    <h4><span className='fw-normal text-secondary fs-6'>EGP</span> {(Array.isArray(flight1) ? flight1[0].baseCost + flight1[1].baseCost : flight1.baseCost) + (Array.isArray(flight2) ? flight2[0].baseCost + flight2[1].baseCost : flight2.baseCost)}</h4>
                    :
                    <h4><span className='fw-normal text-secondary fs-6'>EGP</span> 
                    {
                  (Array.isArray(flight1) ? flight1[0].baseCost + flight1[1].baseCost : flight1.baseCost)
                  -
                  ((
                  (Array.isArray(flight1) ? flight1[0].baseCost + flight1[1].baseCost : flight1.baseCost)
                  *
                    (
                      (Array.isArray(flight1) ? flight1[0].offerPercentage + flight1[1].offerPercentage : flight1.offerPercentage) 
                      / 100
                    )
                  ))
                  +
                  (
                    (Array.isArray(flight2) ? flight2[0].baseCost + flight2[1].baseCost : flight2.baseCost)
                    -
                    ((Array.isArray(flight2) ? flight2[0].baseCost + flight2[1].baseCost : flight2.baseCost)
                    *
                     (
                      (Array.isArray(flight2) ? flight2[0].offerPercentage + flight2[1].offerPercentage : flight2.offerPercentage)
                      / 100
                     ))
                  )

                } 
                    <small className='ms-1 fw-normal text-secondary text-decoration-line-through' style={{fontSize: "13px"}}>{(Array.isArray(flight1) ? flight1[0].baseCost + flight1[1].baseCost : flight1.baseCost) + (Array.isArray(flight2) ? flight2[0].baseCost + flight2[1].baseCost : flight2.baseCost)}</small></h4>
                  }

                <p className='text-secondary'><small>Per Person</small></p>
                <button
                  type="button"
                  className="btn rounded-5 text-white px-3 py-2"
                  style={{ backgroundColor: "var(--main-color)" }}
                  onClick={() => handleShowModal([flight1, flight2])}
                >
                  View Deals
                </button>
              </div>
            </div>
          ))
        ))
      ) : (
        <div className='d-flex flex-column  justify-content-center align-items-center text-secondary '>
          <h3>Sorry We Couldn't Found Any Result</h3>
          <img src={NoResult} width={400} />
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

export default RoundTripResult;