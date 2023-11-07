import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const OneWayForm = ({ handleFlightData }) => {
  const [departure, setDeparture] = useState(getTodayDate());
  const [destinationFrom, setDestinationFrom] = useState('');
  const [destinationTo, setDestinationTo] = useState('');

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchResults = [
      {
        name: "Flight 1",
        company: "A",
        capacity: 150,
        maxLoad: 12,
        baggageWeight: 25,
        maxDistance: 600,
        departureTime: "2023-05-04 08:12:00",
        arrivalTime: "2023-05-04 10:12:00",
        availableSeats: 120,
        baseCost: 1200,
        baggageWeight: 20,
        totalDistance: 550,
        type: "D",
        sourceCountry: "Palastine",
        destinationCountry: "Egypt"
      },
      {
        name: "Flight 2",
        company: "B",
        capacity: 200,
        maxLoad: 10,
        baggageWeight: 20,
        maxDistance: 800,
        departureTime: "2023-05-04 08:12:00",
        arrivalTime: "2023-05-04 08:12:00",
        availableSeats: 180,
        baseCost: 1000,
        baggageWeight: 15,
        totalDistance: 700,
        type: "D",
        sourceCountry: "Egypt",
        destinationCountry: "Palastine"
      },
    ]
    handleFlightData(searchResults);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const toQuery = queryParams.get('to');
    if (toQuery) {
      setDestinationTo(toQuery);
    }
  }, []);

  return (
    <form className='row row-cols-3 align-items-center ' onSubmit={handleSubmit}>
      {/* From */}
      <div className='col from'>
        <FloatingLabel
          controlId="floatingInput"
          label={<span><FontAwesomeIcon icon={faLocationDot} /> From</span>}
          className="mb-3"
        >
          <Form.Control 
            type="text"
            value={destinationFrom}
            onChange={(e) => setDestinationFrom(e.target.value)}
            placeholder='From'
          />
        </FloatingLabel>
      </div>

      {/* To */}
      <div className='col to'>
        <FloatingLabel
          controlId="floatingInput"
          label={<span><FontAwesomeIcon icon={faLocationDot} /> To</span>}
          className="mb-3"
        >
          <Form.Control 
            type="text"
            value={destinationTo}
            onChange={(e) => setDestinationTo(e.target.value)}
            placeholder='To'
          />
        </FloatingLabel>
      </div>

      {/* Time */}
      <div className='col departure'>
        <FloatingLabel
          controlId="floatingInput"
          label={<span><FontAwesomeIcon icon={faLocationDot} /> Departure</span>}
          className="mb-3"
        >
          <Form.Control 
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            placeholder="Departure"
            min={getTodayDate()}
          />
        </FloatingLabel>
      </div>

      {/* Direct Or Not */}
      <div className='col-6'>
        <Form.Check 
          type='checkbox'
          id='default-checkbox'
          label='Direct Flights Only'
        />
      </div>

      {/* Submit */}
      <div className='col-6 from text-end'>
        <Button type="submit" className='search-submit'>Search</Button>
      </div>
    </form>
  );
};

export default OneWayForm;