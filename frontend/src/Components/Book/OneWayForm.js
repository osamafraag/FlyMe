import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const OneWayForm = ({ handleFlightData, cities }) => {
  const [departure, setDeparture] = useState(getTodayDate());
  const [destinationFrom, setDestinationFrom] = useState('');
  const [destinationTo, setDestinationTo] = useState('');
  const [ error , setError ] = useState('')

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destinationFrom === destinationTo) {
      setError("You Can't Select Destination To To Be The Same Of From")
      return;
    }
    const searchResults = [
      {
        id: 1,
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
        id: 2,
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
    <form className='row row-cols-3 align-items-center form-floating' onSubmit={handleSubmit}>
      {/* From */}
      <div className='col'>
        <div class="form-floating mb-3">
          <input 
            className="form-control"
            type="text"
            id='from'
            value={destinationFrom}
            onChange={(e) => {setDestinationFrom(e.target.value); setError("")}}
            list="citiesFrom"
            placeholder='From' 
          />
          <datalist id="citiesFrom">
            {cities.map((city) => (
              <option key={city.id} value={city.name} />
            ))}
          </datalist>
          <label for="from"><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> From</label>
        </div>
      </div>

      {/* To */}
      <div className='col'>
        <div class="form-floating mb-3 ">
          <input 
            className={`form-control ${error != '' ? "toError" : "" }`} 
            type="text"
            value={destinationTo}
            onChange={(e) => {setDestinationTo(e.target.value); setError("")}}
            list="citiesTo"
            id="to" 
            placeholder='To'
          />
          <datalist id="citiesTo">
            {cities.map((city) => (
              <option key={city.id} value={city.name} />
            ))}
          </datalist>
          <label for="to"><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> To</label>
        </div> 
      </div>

      {/* Time */}
      <div className='col'>
        <div class="form-floating mb-3">
          <input 
            type="date"
            className="form-control"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            min={getTodayDate()} 
            id="departure"
            placeholder='Departure' 
          />
          <label for="departure"><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> Departure</label>
        </div>
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