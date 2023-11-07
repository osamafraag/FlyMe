import React, { useState } from 'react';

const RoundTripResult = ({ flightData }) => {

  return (
    <div>
      {flightData[0].map((flight1, index1) => (
        flightData[1].map((flight2, index2) => (
          <div key={index1 + '-' + index2}>
            <h3>Going Flight: {flight1.name}</h3>
            <p>Source: {flight1.sourceCountry} - Destination: {flight1.destinationCountry}</p>

            <h3>Return Flight: {flight2.name}</h3>
            <p>Source: {flight2.sourceCountry} - Destination: {flight2.destinationCountry}</p>

            <hr />
          </div>
        ))
      ))}
    </div>
  );
};

export default RoundTripResult;