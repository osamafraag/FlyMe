import React, { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import "./../Home/Landing.css"
import { SearchFlight } from "./../../APIs/SearchFlights"

const MultiCityForm = ({ handleFlightData, cities }) => {
  const [toErrors, setToErrors] = useState([false, false, false]);
  const [fromErrors, setFromErrors] = useState([false, false, false]);
  const [flights, setFlights] = useState([
    { departure: getTodayDate(), destinationFrom: '', destinationTo: ''},
    { departure: getTodayDate(), destinationFrom: '', destinationTo: ''},
    { departure: getTodayDate(), destinationFrom: '', destinationTo: ''},
  ]);
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);

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

  const handleFrominput = (e, index) => {
    handleInputChange(index, 'destinationFrom', e.target.value);
    setToErrors((prevToErrors) => {
      const newToErrors = [...prevToErrors];
      if (newToErrors[index] != "Required" ) newToErrors[index] = false; 
      return newToErrors;
    });
    setFromErrors((prevFromErrors) => {
      const newFromErrors = [...prevFromErrors];
      newFromErrors[index] = false; 
      return newFromErrors;
    });
  }

  const handleToinput = (e, index) => {
    handleInputChange(index, 'destinationTo', e.target.value);
    setToErrors((prevToErrors) => {
      const newToErrors = [...prevToErrors];
      newToErrors[index] = false; 
      return newToErrors;
    });
  }

  const handleCheckboxChange = (e) => {
    setDirectFlightsOnly(e.target.checked);
  };

  const handleDateChange = (e, index) => {
    const selectedDate = e.target.value;
    const [year, month, day] = selectedDate.split('-');
    handleInputChange(index, 'departure', selectedDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newToErrors = [false, false, false];
    const newFromErrors = [false, false, false];
  
    try {
      const resultsArray = await Promise.all(
        flights.map(async (currentFlight, index) => {
          const [departureYear, departureMonth, departureDay] = currentFlight.departure.split('-').map(Number);
          const result = await SearchFlight(
            currentFlight.destinationFrom,
            currentFlight.destinationTo,
            departureYear,
            departureMonth,
            departureDay,
            directFlightsOnly
          );
          return result.data;
        })
        );
        console.log(resultsArray)
      handleFlightData(resultsArray);
    } catch (error) {
      console.error("Error fetching search results:", error);
      handleFlightData([]);
    }
  };
  
  
  return (
    <form className='row row-cols-3 align-items-center ' onSubmit={handleSubmit}>
      {flights.map((flight, index) => (
        <>
          {/* From */}
          <div className='col from' key={index}>
            <div className="form-floating mb-3">
              <input 
                className={`form-control ${fromErrors[index] ? "Error" : "" }`}
                type="text"
                value={flight.destinationFrom}
                onChange={(e) => handleFrominput(e, index)}
                list={`citiesFrom${index}`}
                id={`from${index}`}
                placeholder='From' 
              />
              <datalist  id={`citiesFrom${index}`}>
                {cities.map((city) => (
                  <option key={city.id} value={city.name} />
                ))}
              </datalist>
              <label htmlFor={`from${index}`}>
                <FontAwesomeIcon icon={faLocationDot} style={{color: "var(--main-color)"}}/> From
              </label>
            </div>
          </div>

          {/* To */}
          <div className='col to' key={index}>
            <div className="form-floating mb-3 ">
              <input
                className={`form-control ${toErrors[index] ? "Error" : "" }`}
                type="text"
                value={flight.destinationTo}
                onChange={(e) => handleToinput(e, index)}
                list={`citiesTo${index}`}
                id={`to${index}`}
                placeholder='To'
              />
              <datalist id={`citiesTo${index}`}>
                {cities.map((city) => (
                  <option key={city.id} value={city.name} />
                ))}
              </datalist>
              <label htmlFor={`to${index}`}>
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
                onChange={(e) => handleDateChange(e, index)}
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

export default MultiCityForm;
