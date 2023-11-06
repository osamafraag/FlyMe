import React, { useState } from 'react';
import HomeCard from './Card';
import { useNavigate } from "react-router-dom";

export default function TripIdeas({tripIdeas}) {
  const navigate = useNavigate()
  const redirectToTripIdeas = (id) => {
    navigate(`/TripIdeas/${id}`)
  }
  return (
    <div className='container my-5 px-5 pt-5'>
      <h3 className='text-start mb-5'>Trip Ideas</h3>
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 justify-content-center align-items-center ">
        {tripIdeas.map((trip, index) => {
          return (
            <div className="col d-flex justify-content-center align-items-center" key={index}>
              <HomeCard data={trip} navigation={(id) => redirectToTripIdeas(id)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}