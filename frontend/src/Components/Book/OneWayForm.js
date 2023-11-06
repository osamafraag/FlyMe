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
    const searchResults = ["OneWay", "Hi"] 
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