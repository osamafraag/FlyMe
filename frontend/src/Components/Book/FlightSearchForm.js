import React, { useState } from 'react';
import OneWayForm from './OneWayForm';
import RoundTripForm from './RoundTripForm';
import MultiCityForm from './MultiCityForm';

const FlightSearchForm = () => {
  const [searchType, setSearchType] = useState('oneWay');

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  return (
    <div className='text-start mx-5'>
      <div className='mb-4'>
        <button className={searchType === 'oneWay' ? 'btn me-3 search-type active' : 'btn me-3 search-type'} onClick={() => handleSearchTypeChange('oneWay')}>One Way</button>
        <button className={searchType === 'roundTrip' ? 'btn me-3 search-type active' : 'btn me-3 search-type'}  onClick={() => handleSearchTypeChange('roundTrip')}>Round Trip</button>
        <button className={searchType === 'multiCity' ? 'btn me-3 search-type active' : 'btn me-3 search-type'} onClick={() => handleSearchTypeChange('multiCity')}>Multi City</button>
      </div>
      {searchType === 'oneWay' && <OneWayForm />}
      {searchType === 'roundTrip' && <RoundTripForm />}
      {searchType === 'multiCity' && <MultiCityForm />}
    </div>
  );
};

export default FlightSearchForm;