import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const MultiCityForm = ({ handleFlightData }) => {
  const [flights, setFlights] = useState([
    {
      departure: getTodayDate(),
      destinationFrom: '',
      destinationTo: '',
    },
    {
      departure: getTodayDate(),
      destinationFrom: '',
      destinationTo: '',
    },
    {
      departure: getTodayDate(),
      destinationFrom: '',
      destinationTo: '',
    },
  ]);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleInputChange = (index, field, value) => {
    const updatedFlights = [...flights];
    updatedFlights[index][field] = value;
    setFlights(updatedFlights);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchResults = ["MultiCities"] 
    handleFlightData(searchResults);
  };

  return (
    <form className='row row-cols-3 align-items-center ' onSubmit={handleSubmit}>
      {flights.map((flight, index) => (
        <>
        {/* From */}
        <div className='col from' key={index}>
          <FloatingLabel
            controlId={`floatingInputFrom${index}`}
            label={<span><FontAwesomeIcon icon={faLocationDot} /> From</span>}
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={flight.destinationFrom}
              onChange={(e) => handleInputChange(index, 'destinationFrom', e.target.value)}
              placeholder='From'
            />
          </FloatingLabel>
        </div>

        {/* To */}
        <div className='col to' key={index}>
          <FloatingLabel
            controlId={`floatingInputTo${index}`}
            label={<span><FontAwesomeIcon icon={faLocationDot} /> To</span>}
            className="mb-3"
          >
            <Form.Control
              type="text"
              value={flight.destinationTo}
              onChange={(e) => handleInputChange(index, 'destinationTo', e.target.value)}
              placeholder='To'
            />
          </FloatingLabel>
        </div>

        {/* Time */}
        <div className='col departure' key={index}>
          <FloatingLabel
            controlId={`floatingInputDeparture${index}`}
            label={<span><FontAwesomeIcon icon={faLocationDot} /> Departure</span>}
            className="mb-3"
          >
            <Form.Control
              type="date"
              value={flight.departure}
              onChange={(e) => handleInputChange(index, 'departure', e.target.value)}
              placeholder="Departure"
              min={getTodayDate()}
            />
          </FloatingLabel>
        </div>
        </>
      ))}

      {/* Direct Or Not */}
      <div className='col-6'>
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

export default MultiCityForm;
