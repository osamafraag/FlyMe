import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OneWayForm from './OneWayForm';
import RoundTripForm from './RoundTripForm';
import MultiCityForm from './MultiCityForm';
import SearchResult from './../Search/Search'

const FlightSearchForm = () => {
  const [searchType, setSearchType] = useState('oneWay');
  const [flightData, setFlightData] = useState(null);
  const navigate = useNavigate();

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleFlightData = (data) => {
    setFlightData(data);
    navigate(`/SearchResult/${searchType}`, { state: { flightData: data } });
  };

  return (
    <div className='text-start mx-5'>
      <div className='mb-4'>
        <button className={searchType === 'oneWay' ? 'btn me-3 search-type active' : 'btn me-3 search-type'} onClick={() => handleSearchTypeChange('oneWay')}>One Way</button>
        <button className={searchType === 'roundTrip' ? 'btn me-3 search-type active' : 'btn me-3 search-type'}  onClick={() => handleSearchTypeChange('roundTrip')}>Round Trip</button>
        <button className={searchType === 'multiCity' ? 'btn me-3 search-type active' : 'btn me-3 search-type'} onClick={() => handleSearchTypeChange('multiCity')}>Multi City</button>
      </div>
      {searchType === 'oneWay' && <OneWayForm handleFlightData={handleFlightData} />}
      {searchType === 'roundTrip' && <RoundTripForm handleFlightData={handleFlightData} />}
      {searchType === 'multiCity' && <MultiCityForm handleFlightData={handleFlightData} />}
    </div>
  );
};

export default FlightSearchForm;