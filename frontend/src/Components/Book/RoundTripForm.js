import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const RoundTripForm = ({ handleFlightData }) => {
  const [departure, setDeparture] = useState(getTodayDate());
  const [returnDate, setReturnDate] = useState('');
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
    const searchResults = ["RoundTrip"] 
    handleFlightData(searchResults);
  };

  return (
    <form className='row row-cols-3 align-items-center justify-content-between' onSubmit={handleSubmit}>
      <div className='col-7 row'>
        {/* From */}
        <div className='col'>
          <FloatingLabel
            controlId="floatingInput"
            label={<span><FontAwesomeIcon icon={faLocationDot} /> From</span>}
            className="mb-3 "
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
        <div className='col'>
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
      </div>

      {/* Time */}
      <div className='col-5 departure d-flex'>
        {/* Going Time */}
        <FloatingLabel
          controlId="floatingInput"
          label={<span><FontAwesomeIcon icon={faLocationDot} /> Departure</span>}
          className="mb-3 w-50"
        >
          <Form.Control 
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            placeholder="Departure"
            className='departure-input'
            min={getTodayDate()}
            max={returnDate}
          />
        </FloatingLabel>

        {/* Return Time */}
        <FloatingLabel
          controlId="floatingInput"
          label={<span><FontAwesomeIcon icon={faLocationDot} /> Return</span>}
          className="mb-3 w-50"
        >
          <Form.Control 
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            placeholder="Return"
            className='return-input'
            min={departure}
          />
        </FloatingLabel>
      </div>

      {/* Direct Or Not */}
      <div className='col-6 return'>
        <Form.Check 
          type='checkbox'
          id='default-checkbox'
          label='Direct Flights Only'
        />
      </div>

      {/* Submit */}
      <div className='col-6 text-end'>
        <Button type="submit" className='search-submit'>Search</Button>
      </div>
    </form>
  );
};

export default RoundTripForm;