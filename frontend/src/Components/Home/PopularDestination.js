import React, { useState } from 'react';
import HomeCard from './Card';
import { useNavigate } from "react-router-dom";

export default function PopularDestination({popularDestination}) {
  const navigate = useNavigate()
  const redirectSearchResult = (id) => {
    const selectedDestination = popularDestination.find(destination => destination.id === id);
    if (selectedDestination) {
      const { name } = selectedDestination;
      navigate(`/Book?to=${name}`);
    }
  }
  return (
    <div className='container px-5'>
      <h3 className='text-start mb-5'>Popular Destinations</h3>
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 justify-content-center align-items-center ">
        {popularDestination.slice(0, 3).map((destination, index) => {
          return (
            <div className="fade-out col d-flex justify-content-center align-items-center" key={index}>
              <HomeCard data={destination} navigation={(id) => redirectSearchResult(id)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}