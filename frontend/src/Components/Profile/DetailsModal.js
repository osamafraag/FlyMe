import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Flight from './../Search/Flight'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChair, faLayerGroup, faMoneyCheckDollar, faPercent, faCircle } from '@fortawesome/free-solid-svg-icons'

const CustomModal = ({ show, handleClose, handleConfirm, title, flights, booking }) => {
  return (
    <Modal show={show} onHide={handleClose} className='modal-lg modal-dialog-scrollable'>
      <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fafafa" }}>
        <p className='text-uppercase fw-bold' style={{ color: "var(--text-color)" }}>Itinerary</p>
        {flights.map((flight, index) => (
          <div className='border border-1 rounded-3 p-4 my-3 bg-white' key={index}>
            {Array.isArray(flight) ? (
              <>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='fw-bold'>{flight.departureTime}</p>
                  <p className='fw-bold'>{flight.arrivalTime}</p>
                </div>
                <div className='flight-info'>
                  {flight.map((segment, segmentIndex) => (
                    <>
                      <Flight key={segmentIndex} flight={segment} />
                      <div className='other-info mt-5 justify-content-center align-item-center'>
                        <p className='col-4 text-center mb-4'><FontAwesomeIcon icon={faChair} style={{ color: "var(--main-color)" }} /> <span className='fw-bold'>Available Seats: </span>{segment.availableSeats}</p>
                        <p className='col-4 text-center mb-4'><FontAwesomeIcon icon={faMoneyCheckDollar} style={{ color: "var(--main-color)" }} /> <span className='fw-bold'>Base Cost: </span>{segment.baseCost}</p>
                        <p className='col-4 text-center mb-4'><FontAwesomeIcon icon={faPercent} style={{ color: "var(--main-color)" }} /> <span className='fw-bold'>Offer: </span>{segment.offerPercentage}</p>
                        <p className='col-4 text-center mb-4'><FontAwesomeIcon icon={faLayerGroup} style={{ color: "var(--main-color)" }} /> <span className='fw-bold'>Class: </span>{booking.category_name}</p>
                        <p className='col-6 text-center mb-4'>
                          {segment.status == 'A'
                            ?
                            <><FontAwesomeIcon icon={faCircle} className='text-success' /> <span className='fw-bold'>Flight Status: </span> Active</>
                            :
                            <><FontAwesomeIcon icon={faCircle} className='text-danger' /> <span className='fw-bold'>Flight Status: </span> Cancel</>
                          }
                        </p>
                        <p className='col-6 text-center mb-4'>
                          {booking.status == 'A'
                            ?
                            <><FontAwesomeIcon icon={faCircle} className='text-success' /> <span className='fw-bold'>Booking Status: </span> Active</>
                            :
                            <><FontAwesomeIcon icon={faCircle} className='text-danger' /> <span className='fw-bold'>Booking Status: </span> Cancel</>
                          }
                        </p>
                      </div>
                      <br /><br />
                    </>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='fw-bold'>{flight.departureTime}</p>
                  <p className='fw-bold'>{flight.arrivalTime}</p>
                </div>
                <Flight flight={flight} />
                <div className='other-info mt-5 row row-cols-4 justify-content-center align-item-center'>
                  <p className='col-4 text-center mb-4'><FontAwesomeIcon icon={faChair} style={{ color: "var(--main-color)" }} /> <span className='fw-bold'>Available Seats: </span>{flight.availableSeats}</p>
                  <p className='col-4 text-center mb-4'><FontAwesomeIcon icon={faMoneyCheckDollar} style={{ color: "var(--main-color)" }} /> <span className='fw-bold'>Base Cost: </span>{flight.baseCost}</p>
                  <p className='col-4 text-center mb-4'><FontAwesomeIcon icon={faPercent} style={{ color: "var(--main-color)" }} /> <span className='fw-bold'>Offer: </span>{flight.offerPercentage}%</p>
                  <p className='col-4 text-center mb-4'><FontAwesomeIcon icon={faLayerGroup} style={{ color: "var(--main-color)" }} /> <span className='fw-bold'>Class: </span>{booking.category_name}</p>
                  <p className='col-6 text-center mb-4'>
                    {flight.status == 'A'
                      ?
                      <><FontAwesomeIcon icon={faCircle} className='text-success' /> <span className='fw-bold'>Flight Status: </span> Active</>
                      :
                      <><FontAwesomeIcon icon={faCircle} className='text-danger' /> <span className='fw-bold'>Flight Status: </span> Cancel</>
                    }
                  </p>
                  <p className='col-6 text-center mb-4'>
                    {booking.status == 'A'
                      ?
                      <><FontAwesomeIcon icon={faCircle} className='text-success' /> <span className='fw-bold'>Booking Status: </span> Active</>
                      :
                      <><FontAwesomeIcon icon={faCircle} className='text-danger' /> <span className='fw-bold'>Booking Status: </span> Cancel</>
                    }
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {(flights[0].status === "A" && booking.status === "A") && (
          <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={handleConfirm}>
            Cancel Booking
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;