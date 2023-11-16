import React from 'react'
import { useState, useEffect } from 'react';
import { AircraftsAPI } from './../APIs/Aircrafts'
    
export default function Aircrafts() {
  const [aircrafts, setAircrafts] = useState([])

  useEffect(() => {
    AircraftsAPI()
      .then((result) => {
        setAircrafts(result.data)
      })
      .catch((error) => console.log(error));
    }, []);

  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary'>Aircrafts</h3>
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 justify-content-center align-items-center ">
        {aircrafts.slice(0, 3).map((aircraft, index) => {
          return (
            <div className="col d-flex justify-content-center align-items-center" key={index}>
              <div>{aircraft.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}