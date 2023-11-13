import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import "./../Home/Landing.css"

const MultiCityForm = ({ handleFlightData, cities }) => {
  const [toErrors, setToErrors] = useState([false, false, false]);
  const [flights, setFlights] = useState([
    { departure: getTodayDate(), destinationFrom: '', destinationTo: ''},
    { departure: getTodayDate(), destinationFrom: '', destinationTo: ''},
    { departure: getTodayDate(), destinationFrom: '', destinationTo: ''},
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
    const newToErrors = [false, false, false];

    for (let i = 0; i < flights.length; i++) {
      const currentFlight = flights[i];
      const fromCity = currentFlight.destinationFrom;
      const toCity = currentFlight.destinationTo;

      if (fromCity === toCity) {
        newToErrors[i] = true;
      }
    }
  
    setToErrors(newToErrors);
    if (newToErrors.some((error) => error)) return;

    const flights1 = [
      {
        id: 1,
        name: "Flight 1",
        company: "A",
        capacity: 150,
        maxLoad: 12,
        baggageWeight: 25,
        maxDistance: 600,
        departureTime: "2023-11-07",
        arrivalTime: "2023-11-07",
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
        departureTime: "2023-11-08",
        arrivalTime: "2023-11-08",
        availableSeats: 180,
        baseCost: 1000,
        baggageWeight: 15,
        totalDistance: 700,
        type: "D",
        sourceCountry: "Egypt",
        destinationCountry: "Palastine"
      },
    ]

    const flights2 = [
      {
        id: 3,
        name: "Flight 1",
        company: "A",
        capacity: 150,
        maxLoad: 12,
        baggageWeight: 25,
        maxDistance: 600,
        departureTime: "2023-11-07",
        arrivalTime: "2023-11-07",
        availableSeats: 120,
        baseCost: 1200,
        baggageWeight: 20,
        totalDistance: 550,
        type: "D",
        sourceCountry: "Palastine",
        destinationCountry: "Egypt"
      },
      {
        id: 4,
        name: "Flight 2",
        company: "B",
        capacity: 200,
        maxLoad: 10,
        baggageWeight: 20,
        maxDistance: 800,
        departureTime: "2023-11-08",
        arrivalTime: "2023-11-08",
        availableSeats: 180,
        baseCost: 1000,
        baggageWeight: 15,
        totalDistance: 700,
        type: "D",
        sourceCountry: "Egypt",
        destinationCountry: "Palastine"
      },
      {
        id: 5,
        name: "Flight 3",
        company: "B",
        capacity: 200,
        maxLoad: 10,
        baggageWeight: 20,
        maxDistance: 800,
        departureTime: "2023-11-08",
        arrivalTime: "2023-11-08",
        availableSeats: 180,
        baseCost: 1000,
        baggageWeight: 15,
        totalDistance: 700,
        type: "D",
        sourceCountry: "Egypt",
        destinationCountry: "Palastine"
      },
    ]

    const flights3 = [
      {
        id: 6,
        name: "Flight 1",
        company: "A",
        capacity: 150,
        maxLoad: 12,
        baggageWeight: 25,
        maxDistance: 600,
        departureTime: "2023-11-07",
        arrivalTime: "2023-11-07",
        availableSeats: 120,
        baseCost: 1200,
        baggageWeight: 20,
        totalDistance: 550,
        type: "D",
        sourceCountry: "Palastine",
        destinationCountry: "Egypt"
      },
      {
        id: 7,
        name: "Flight 2",
        company: "B",
        capacity: 200,
        maxLoad: 10,
        baggageWeight: 20,
        maxDistance: 800,
        departureTime: "2023-11-08",
        arrivalTime: "2023-11-08",
        availableSeats: 180,
        baseCost: 1000,
        baggageWeight: 15,
        totalDistance: 700,
        type: "D",
        sourceCountry: "Egypt",
        destinationCountry: "Palastine"
      },
      {
        id: 8,
        name: "Flight 3",
        company: "B",
        capacity: 200,
        maxLoad: 10,
        baggageWeight: 20,
        maxDistance: 800,
        departureTime: "2023-11-08",
        arrivalTime: "2023-11-08",
        availableSeats: 180,
        baseCost: 1000,
        baggageWeight: 15,
        totalDistance: 700,
        type: "D",
        sourceCountry: "Egypt",
        destinationCountry: "Palastine"
      },
      {
        id: 9,
        name: "Flight 4",
        company: "B",
        capacity: 200,
        maxLoad: 10,
        baggageWeight: 20,
        maxDistance: 800,
        departureTime: "2023-11-08",
        arrivalTime: "2023-11-08",
        availableSeats: 180,
        baseCost: 1000,
        baggageWeight: 15,
        totalDistance: 700,
        type: "D",
        sourceCountry: "Egypt",
        destinationCountry: "Palastine"
      },
    ]
    

    const searchResults = [flights1, flights2, flights3] 
    handleFlightData(searchResults);
  };

  return (
    <form className='row row-cols-3 align-items-center ' onSubmit={handleSubmit}>
      {flights.map((flight, index) => (
        <>
        {/* From */}
        <div className='col from' key={index}>
          <div class="form-floating mb-3">
            <input 
              className="form-control"
              type="text"
              value={flight.destinationFrom}
              onChange={(e) => {
                handleInputChange(index, 'destinationFrom', e.target.value);
                setToErrors((prevToErrors) => {
                  const newToErrors = [...prevToErrors];
                  newToErrors[index] = false; 
                  return newToErrors;
                });
              }}
              list={`citiesFrom${index}`}
              id={`from${index}`}
              placeholder='From' 
            />
            <datalist  id={`citiesFrom${index}`}>
              {cities.map((city) => (
                <option key={city.id} value={city.name} />
              ))}
            </datalist>
            <label for={`from${index}`}><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> From</label>
          </div>
        </div>

        {/* To */}
        <div className='col to' key={index}>
          <div className="form-floating mb-3 ">
            <input
              className={`form-control ${toErrors[index] ? "toError" : "" }`}
              type="text"
              value={flight.destinationTo}
              onChange={(e) => {
                  handleInputChange(index, 'destinationTo', e.target.value);
                  setToErrors((prevToErrors) => {
                    const newToErrors = [...prevToErrors];
                    newToErrors[index] = false; 
                    return newToErrors;
                  });
                }}
              list={`citiesTo${index}`}
              id={`to${index}`}
              placeholder='To'
            />
            <datalist id={`citiesTo${index}`}>
              {cities.map((city) => (
                <option key={city.id} value={city.name} />
              ))}
            </datalist>
            <label for={`to${index}`}>
              <FontAwesomeIcon icon={faLocationDot} style={{ color: 'var(--main-color)' }} /> To
            </label>
          </div>
        </div>

        {/* Time */}
        <div className='col departure' key={index}>
          <div class="form-floating mb-3">
            <input 
              type="date"
              className="form-control"
              value={flight.departure}
              onChange={(e) => handleInputChange(index, 'departure', e.target.value)}
              min={getTodayDate()} 
              id="departure"
              placeholder='Departure' 
            />
            <label for="departure"><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> Departure</label>
          </div>
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
