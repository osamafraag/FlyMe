import React , { useState } from 'react'
import "./Search.css"
import "./../Home/Landing.css"
import { useParams, useLocation } from 'react-router-dom';
import FlightSearchForm from "../Book/FlightSearchForm"
import OneWayResult from './OneWayResult';
import RoundTripResult from './RoundTripResult';
import MultiCityResult from './MultiCitiesResult';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function SearchResult() {
  const { searchType } = useParams();
  const location = useLocation();
  const { flightData } = location.state || {};

  const [sliderValue, setSliderValue] = useState(40000);

  const handleChange = (event) => {
    setSliderValue(event.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  return (
    <div className='pt-3' style={{backgroundColor: "var(--alternative-white-color)"}}>
      {/* Search Form */}
      <div className="searchPage-form container mx-auto bg-white py-5 border border-1 rounded-3" >
        <FlightSearchForm />
      </div>

      {/* ***************************************** */}

      {/* Search Result */}
      <div className='container mx-auto pb-5 mt-5'>
        <div className='search-result row justify-content-between g-5 ps-2' >

          <div className='col-3 bg-white p-5 mb-3 rounded-3 border border-1' style={{height: "330px"}}>
            {/* Price */}
            {/* <div>
              <p className='text-start fw-bold text-uppercase '>Total Trip Price</p>
              <div className='d-flex justify-content-between'>
                <p className='text-secondary text-start mb-0'><small>Egp 10000</small></p>
                <p className='text-secondary text-end mb-0'><small>Egp 40000</small></p>
              </div>
              <input 
                type='range'
                min={10000}
                max={40000}
                step={100}
                value={sliderValue}
                onChange={handleChange}
                custom
                className='w-100 border-0 cutom-range'
                style={{ backgroundColor: 'var(--main-color)' }}
              />
            </div> */}

            {/* Stops */}
            <div className='stops mt-4'>
              <p className='text-start fw-bold text-uppercase '>Stops</p>
              <Form.Check 
                type='checkbox'
                id='default-checkbox'
                label='Direct'
                className='w-50'
              />
              <Form.Check 
                type="checkbox"
                id="default-checkbox"
                label="Transit"
                className='w-50'
              />
            </div>
          </div>
          
          {/* Flights */}
          <div className='col-9'>
            {searchType === 'oneWay' && flightData && (
              <OneWayResult flightData={flightData} />
            )}
            {searchType === 'roundTrip' && flightData && (
              <RoundTripResult flightData={flightData} />
            )}
            {searchType === 'multiCity' && flightData && (
              <MultiCityResult flightData={flightData} />
            )}
          </div>

         <div className='container-fluid d-flex justify-content-end position-fixed bottom-0 end-0 '>
          <button onClick={scrollToTop} className='btn border-0' style={{color: "var(--main-color)", borderRadius: "50%"}}><FontAwesomeIcon icon={faArrowUp} className='p-3 bg-white' style={{borderRadius: "50%"}}/></button>
         </div>
        </div>
      </div>
      
    </div>
  );
}