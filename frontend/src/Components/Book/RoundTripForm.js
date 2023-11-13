import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const RoundTripForm = ({ handleFlightData, cities }) => {
  const [departure, setDeparture] = useState(getTodayDate());
  const [returnDate, setReturnDate] = useState('');
  const [destinationFrom, setDestinationFrom] = useState('');
  const [destinationTo, setDestinationTo] = useState('');
  const [ errorFrom , setErrorFrom ] = useState('')
  const [ errorTo , setErrorTo ] = useState('')

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleFrominput = (e) => {
    setDestinationFrom(e.target.value); 
    if (errorTo != "Required") setErrorTo("")
    setErrorFrom("")
  }

  const handleToinput = (e) => {
    setDestinationTo(e.target.value); 
    setErrorTo("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destinationFrom === destinationTo & destinationTo != "" & destinationFrom != "") {
      setErrorTo("You Can't Select Destination To To Be The Same Of From")
      return;
    } else if (destinationFrom == "" & destinationTo == "") {
      setErrorFrom("Required")
      setErrorTo("Required")
      return;
    } else if (destinationFrom == "") {
      setErrorFrom("Required")
      return;
    } else if (destinationTo == "") {
      setErrorTo("Required")
      return;
    }

    const flights1 = [
      {
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
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
        id: "5",
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
    const searchResults = [flights1, flights2] 
    handleFlightData(searchResults);
  };

  return (
    <form className='row row-cols-3 align-items-center justify-content-between' onSubmit={handleSubmit}>
      <div className='col-7 row'>
        {/* From */}
        <div className='col'>
          <div class="form-floating mb-3">
            <input 
              className={`form-control ${errorFrom != '' ? "Error" : "" }`}
              type="text"
              id='from'
              value={destinationFrom}
              onChange={(e) => handleFrominput(e)}
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
          <div class="form-floating mb-3">
            <input 
              className={`form-control ${errorTo != '' ? "Error" : "" }`} 
              type="text"
              value={destinationTo}
              onChange={(e) => handleToinput(e)}
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
      </div>

      {/* Time */}
      <div className='col-5 departure d-flex'>
        {/* Going Time */}
        <div class="form-floating mb-3 w-50">
          <input 
            type="date"
            className="form-control departure-input"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            min={getTodayDate()}
            max={returnDate}
            id="departure"
            placeholder='Departure' 
          />
          <label for="departure"><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> Departure</label>
        </div>

        {/* Return Time */}
        <div class="form-floating mb-3 w-50">
          <input 
            type="date"
            className="form-control return-input"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={departure}
            id="return"
            placeholder="Return"
          />
          <label for="return"><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> Return</label>
        </div>
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