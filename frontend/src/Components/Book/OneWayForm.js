import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { SearchFlight } from "./../../APIs/SearchFlights"

const OneWayForm = ({ handleFlightData, cities }) => {
  const [departure, setDeparture] = useState(getTodayDate());
  const [departureYear, setDepartureYear] = useState();
  const [departureMonth, setDepartureMonth] = useState();
  const [departureDay, setDepartureDay] = useState();
  const [destinationFrom, setDestinationFrom] = useState('');
  const [destinationTo, setDestinationTo] = useState('');
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);
  const [ errorFrom , setErrorFrom ] = useState('')
  const [ errorTo , setErrorTo ] = useState('')
  
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

  const handleFrominput = (e) => {
    setDestinationFrom(e.target.value); 
    if (errorTo != "Required") setErrorTo("")
    setErrorFrom("")
  }

  const handleToinput = (e) => {
    setDestinationTo(e.target.value); 
    setErrorTo("")
  }

  const handleDeparture = (e) => {
    const selectedDate = e.target.value;

    const [year, month, day] = selectedDate.split('-');

    setDeparture(selectedDate);
    setDepartureYear(Number(year));
    setDepartureMonth(Number(month));
    setDepartureDay(Number(day));
  }

  const handleCheckboxChange = (e) => {
    setDirectFlightsOnly(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (destinationFrom === destinationTo && destinationTo !== "" && destinationFrom !== "") {
      setErrorTo("You can't select the same destination for 'From' and 'To'");
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
    }
  
    SearchFlight(
      destinationFrom,
      destinationTo,
      departureYear,
      departureMonth,
      departureDay,
      directFlightsOnly
    )
      .then((searchResults) => {
        console.log(searchResults.data)
        handleFlightData(searchResults.data);
      })
      .catch((error) => {
        handleFlightData([]);
        console.error("Error fetching search results:", error);
      });
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
        <div className="form-floating mb-3">
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
          <label htmlFor="from"><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> From</label>
        </div>
      </div>

      {/* To */}
      <div className='col'>
        <div className="form-floating mb-3 ">
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
          <label htmlFor="to"><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> To</label>
        </div> 
      </div>

      {/* Time */}
      <div className='col'>
        <div className="form-floating mb-3">
          <input 
            type="date"
            className="form-control"
            value={departure}
            onChange={(e) => handleDeparture(e)}
            min={getTodayDate()} 
            id="departure"
            placeholder='Departure' 
          />
          <label htmlFor="departure"><FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> Departure</label>
        </div>
      </div>

      {/* Direct Or Not */}
      <div className='col-6'>
        <Form.Check
          type='checkbox'
          id='default-checkbox'
          label='Direct Flights Only'
          checked={directFlightsOnly}
          onChange={handleCheckboxChange}
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