import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Flight from './Flight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChair,faMoneyCheckDollar, faPercent} from '@fortawesome/free-solid-svg-icons'

const CustomModal = ({ show, handleClose, handleBooking, title, flights }) => {
  return (
    <Modal show={show} onHide={handleClose} className='modal-lg modal-dialog-scrollable'>
      <Modal.Header closeButton style={{backgroundColor: "#f4f4f4"}}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor: "#fafafa"}}>
        <p className='text-uppercase fw-bold' style={{color: "var(--text-color)"}}>Itinerary</p>
        {flights.map((flight, index) => (
          <div className='border border-1 rounded-3 p-4 my-3 bg-white' key={index}>
             {Array.isArray(flight) ? (
              <>
              <p style={{color: "var(--text-color)"}}>Flight {++index}</p>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='fw-bold'>{flight.departureTime}</p>
                <p className='fw-bold'>{flight.arrivalTime}</p>
              </div>
              <div className='flight-info'>
              {flight.map((segment, segmentIndex) => (
                <>
                  <Flight key={segmentIndex} flight={segment} />
                  <div className='other-info mt-5 row row-cols-3 justify-content-center align-item-center'>
                    <p className='text-center mb-4'><FontAwesomeIcon icon={faChair} style={{color: "var(--main-color)"}}/> <span className='fw-bold'>Available Seats: </span>{segment.availableSeats}</p>
                    <p className='text-center mb-4'><FontAwesomeIcon icon={faMoneyCheckDollar} style={{color: "var(--main-color)"}}/> <span className='fw-bold'>Base Cost: </span>{segment.baseCost}</p>
                    <p className='text-center mb-4'><FontAwesomeIcon icon={faPercent} style={{color: "var(--main-color)"}}/> <span className='fw-bold'>Offer: </span>{segment.offerPercentage}</p>
                  </div>
                  <br/><br/>
                </>
               ))}
              </div>
              </>
             ) : (
              <>
              <p style={{color: "var(--text-color)"}}>Flight {++index}</p>
              <div className='d-flex justify-content-between align-items-center'>
                <p className='fw-bold'>{flight.departureTime}</p>
                <p className='fw-bold'>{flight.arrivalTime}</p>
              </div>
              <Flight flight={flight} />
              <div className='other-info mt-5 row row-cols-3 justify-content-center align-item-center'>
                <p className='text-center mb-4'><FontAwesomeIcon icon={faChair} style={{color: "var(--main-color)"}}/> <span className='fw-bold'>Available Seats: </span>{flight.availableSeats}</p>
                <p className='text-center mb-4'><FontAwesomeIcon icon={faMoneyCheckDollar} style={{color: "var(--main-color)"}}/> <span className='fw-bold'>Base Cost: </span>{flight.baseCost}</p>
                <p className='text-center mb-4'><FontAwesomeIcon icon={faPercent} style={{color: "var(--main-color)"}}/> <span className='fw-bold'>Offer: </span>{flight.offerPercentage}%</p>
              </div>
              </>
             )}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer style={{backgroundColor: "#f4f4f4"}}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className='border-0' style={{backgroundColor: "var(--main-color)"}} onClick={handleBooking}>
          Book Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;