import React, { useState, useEffect } from 'react';
import Landing from './Landing'
import PopularDestination from './PopularDestination';
import TripIdeas from './TripIdeas';
import { PopularCities } from './../../APIs/PopularDestination'
import { TripsCities } from './../../APIs/TripIdes'
import { axiosInstance } from '../../APIs/Config';

export default function HomeComponent() {
  const [popularDestination, setPopularDestination] = useState([])
  const [tripIdeas, setTripIdeas] = useState([]);

  useEffect(() => {
    PopularCities()
      .then((result) => {
        setPopularDestination(result.data)
      })
      .catch((error) => console.log(error));
    
    TripsCities()
      .then((result) => {
        setTripIdeas(result.data)
      })
      .catch((error) => console.log(error));
  
    }, []);
    
  return (
    <div>
      <Landing />
      <PopularDestination popularDestination={popularDestination} />
      <TripIdeas tripIdeas={tripIdeas} />
    </div>
  )
}