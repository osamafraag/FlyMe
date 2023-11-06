import React, { useState } from 'react';
import Landing from './Landing'
import PopularDestination from './PopularDestination';
import TripIdeas from './TripIdeas';

export default function HomeComponent() {
  const popularDestinationData = [
    {
      id: "1",
      name: "Cairo",
      image: "https://www.urtrips.com/wp-content/uploads/2023/03/cairo-tower44.jpg"
    },

    {
      id: "2",
      name: "Alex",
      image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/fe/0e/2b.jpg"
    },

    {
      id: "3",
      name: "Alex",
      image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/fe/0e/2b.jpg"
    }
  ]

  const tripIdeasData = [
    {
      id: "1",
      name: "Palestine",
      image: "https://setav.org/en/assets/uploads/2021/05/116919-1024x670.jpg"
    },
    
    {
      id: "2",
      name: "Egypt",
      image: "https://www.state.gov/wp-content/uploads/2023/07/shutterstock_1037036482v2.jpg"
    },

    {
      id: "3",
      name: "Palestine",
      image: "https://setav.org/en/assets/uploads/2021/05/116919-1024x670.jpg"
    }
  ]

  const [popularDestination, setPopularDestination] = useState(popularDestinationData);
  const [tripIdeas, setTripIdeas] = useState(tripIdeasData);
  return (
    <div>
      <Landing />
      <PopularDestination popularDestination={popularDestination} />
      <TripIdeas tripIdeas={tripIdeas} />
    </div>
  )
}