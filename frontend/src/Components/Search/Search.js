import React , { useState } from 'react'
import "./Search.css"
import { useParams, useLocation } from 'react-router-dom';
import FlightSearchForm from "../Book/FlightSearchForm"
import OneWayResult from './OneWayResult';
import RoundTripResult from './RoundTripResult';
import MultiCityResult from './MultiCitiesResult';
import Form from 'react-bootstrap/Form';

export default function SearchResult() {
  const { searchType } = useParams();
  const location = useLocation();
  const { flightData } = location.state || {};

  const [sliderValue, setSliderValue] = useState(40000);

  const handleChange = (event) => {
    setSliderValue(event.target.value);
  };
  return (
    <div>
      {/* Search Form */}
      <div style={{height: "750px"}}>
        <div className="landing py-5 position-relative" style={{height: "500px"}}>

          <div className="heading mx-auto text-white my-5" style={{width: "70%"}}>
            <h1 className="text-center mb-4">Fly Beyond Boundaries</h1>
            <p className=" lh-lg fs-5">Traveling is not just about reaching a destination; it's about embracing new experiences, expanding your horizons, and finding inspiration in the unknown.</p>
          </div>

          <div className="search-form mx-auto bg-white py-5 rounded-3 shadow" style={{width: "85%"}}>
            <FlightSearchForm />
          </div>
        </div>
      </div>

      {/* ***************************************** */}

      {/* Search Result */}
      <div className='container pb-5 px-4'>
        <div className='search-result row'>
          <div className='col-3 rounded-3 border border-1 p-5'>
            {/* Price */}
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

            {/* Stops */}
            <div className='stops my-4'>
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
                label="1 Stop"
                className='w-50'
              />
              <Form.Check 
                type="checkbox"
                id="default-checkbox"
                label="2 Stop"
                className='w-50'
              />
            </div>
          </div>
          
          {/* Flights */}
          <div className='col'>
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
        </div>
      </div>
      
    </div>
  );
}