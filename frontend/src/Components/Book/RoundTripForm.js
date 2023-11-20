import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { SearchFlight } from "./../../APIs/SearchFlights"

const RoundTripForm = ({ handleFlightData, cities }) => {
  const [departure, setDeparture] = useState(getTodayDate());
  const [departureYear, setDepartureYear] = useState();
  const [departureMonth, setDepartureMonth] = useState();
  const [departureDay, setDepartureDay] = useState();
  const [returnDate, setReturnDate] = useState('');
  const [returnYear, setReturnYear] = useState();
  const [returnMonth, setReturnMonth] = useState();
  const [returnDay, setReturnDay] = useState();
  const [destinationFrom, setDestinationFrom] = useState('');
  const [destinationTo, setDestinationTo] = useState('');
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);
  const [ errorFrom , setErrorFrom ] = useState('')
  const [ errorTo , setErrorTo ] = useState('')
  const [ errorReturn , setErrorReturn ] = useState('')

  useEffect(() => {
    const today = new Date();
    
    setDepartureYear(today.getFullYear());
    setDepartureMonth(today.getMonth() + 1);
    setDepartureDay(today.getDate());
  }, []);

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleDeparture = (e) => {
    const selectedDate = e.target.value;

    const [year, month, day] = selectedDate.split('-');

    setDeparture(selectedDate);
    setDepartureYear(Number(year));
    setDepartureMonth(Number(month));
    setDepartureDay(Number(day));
  }

  const handleReturn = (e) => {
    const selectedDate = e.target.value;

    const [year, month, day] = selectedDate.split('-');

    setReturnDate(selectedDate);
    setReturnYear(Number(year));
    setReturnMonth(Number(month));
    setReturnDay(Number(day));
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

  const handleCheckboxChange = (e) => {
    setDirectFlightsOnly(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (destinationFrom === destinationTo && destinationTo !== "" && destinationFrom !== "") {
      setErrorTo("You Can't Select Destination To To Be The Same Of From");
      return;
    } else if (destinationFrom === "" && destinationTo === "") {
      setErrorFrom("Required");
      setErrorTo("Required");
      return;
    } else if (destinationFrom === "") {
      setErrorFrom("Required");
      return;
    } else if (destinationTo === "") {
      setErrorTo("Required");
      return;
    } else if (returnDate === "") {
      setErrorReturn("Required");
      return;
    }
  
    try {
      const [flights1, flights2] = await Promise.all([
        SearchFlight(
          destinationFrom,
          destinationTo,
          departureYear,
          departureMonth,
          departureDay,
          directFlightsOnly
        ),
        SearchFlight(
          destinationTo,
          destinationFrom,
          returnYear,
          returnMonth,
          returnDay,
          directFlightsOnly
        )
      ]);

      const searchResults = [flights1.data, flights2.data];
      handleFlightData(searchResults);
    } catch (error) {
      handleFlightData([]);
      console.error(error);
    }
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
            onChange={(e) => handleDeparture(e)}
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
            className={`form-control return-input ${errorFrom != '' ? "Error" : "" }`}
            value={returnDate}
            onChange={(e) => handleReturn(e)}
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
          checked={directFlightsOnly}
          onChange={handleCheckboxChange}
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