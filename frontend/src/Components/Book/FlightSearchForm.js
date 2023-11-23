import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OneWayForm from './OneWayForm';
import RoundTripForm from './RoundTripForm';
import MultiCityForm from './MultiCityForm';
import { Cities } from '../../APIs/Cities';

const FlightSearchForm = () => {
  const [searchType, setSearchType] = useState('oneWay');
  const [flightData, setFlightData] = useState(null);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Cities()
      .then((result) => {
        setCities(result.data)
      })
      .catch((error) => console.log(error));
  
    }, []);

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
        <button className={searchType === 'oneWay' ? 'btn me-3 type active' : 'btn me-3 type'} onClick={() => handleSearchTypeChange('oneWay')}>One Way</button>
        <button className={searchType === 'roundTrip' ? 'btn me-3 type active' : 'btn me-3 type'}  onClick={() => handleSearchTypeChange('roundTrip')}>Round Trip</button>
        <button className={searchType === 'multiCity' ? 'btn me-3 type active' : 'btn me-3 type'} onClick={() => handleSearchTypeChange('multiCity')}>Multi City</button>
      </div>
      {searchType === 'oneWay' && <OneWayForm handleFlightData={handleFlightData} cities={cities} />}
      {searchType === 'roundTrip' && <RoundTripForm handleFlightData={handleFlightData} cities={cities} />}
      {searchType === 'multiCity' && <MultiCityForm handleFlightData={handleFlightData} cities={cities} />}
    </div>
  );
};

export default FlightSearchForm;