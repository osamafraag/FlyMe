import React , { useState } from 'react'
import "./Search.css"
import "./../Home/Landing.css"
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
    <div style={{backgroundColor: "var(--alternative-white-color)"}}>
      {/* Search Form */}
      <div style={{height: "700px"}}>
      <div className="landing py-5 position-relative" style={{height: "500px"}}>
        
        <div className="heading mx-auto text-white my-5" style={{width: "70%"}}>
          <h1 className="text-center mb-4 text-white" style={{color: "var(--main-color)"}}>Fly Beyond Boundaries</h1>
          <p className=" lh-lg fs-5 text-white" style={{color: "var(--main-color)"}}>Traveling is not just about reaching a destination; it's about embracing new experiences, expanding your horizons, and finding inspiration in the unknown.</p>
        </div>

        <div className="search-form mx-auto bg-white py-5 rounded-3 shadow-sm" style={{width: "80%"}}>
          <FlightSearchForm />
        </div>
      </div>
    </div>
      {/* ***************************************** */}

      {/* Search Result */}
      <div className='container mx-auto pb-5 mt-5'>
        <div className='search-result row justify-content-center g-5 ps-2' >
          
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