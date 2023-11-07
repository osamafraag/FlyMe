import React, { useState } from 'react';

const MultiCityResult = ({ flightData }) => {
  const combinations = [];

  flightData[0].forEach(flight1 => {
    flightData[1].forEach(flight2 => {
      flightData[2].forEach(flight3 => {
        combinations.push([flight1, flight2, flight3]);
      });
    });
  });

  return (
    <div>
      {combinations.map((combination, index) => (
        <div key={index}>
          {combination.map((flight, flightIndex) => (
            <>
            <h1>{flight.name}</h1>
            <p key={flightIndex}>
              Source: {flight.sourceCountry} - Destination: {flight.destinationCountry}
            </p>
            </>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default MultiCityResult;