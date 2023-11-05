import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const MultiCityForm = () => {
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

  return (
    <form className='row row-cols-3 align-items-center '>
      {flights.map((flight, index) => (
        <>
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
            />
          </FloatingLabel>
        </div>
        </>
      ))}

      <div className='col'>
        <Form.Select aria-label="Default select example" className="custom-select">
          <option value="1">Economy</option>
          <option value="2">Premium Economy</option>
          <option value="3">Business Class</option>
          <option value="4">First Class</option>
        </Form.Select>
      </div>

      <div className='col'>
        <Form.Check
          type='checkbox'
          id='default-checkbox'
          label='Direct Flights Only'
        />
      </div>

      <div className='col text-end'>
        <Button type="submit" className='search-submit'>Search</Button>
      </div>
    </form>
  );
};

export default MultiCityForm;
