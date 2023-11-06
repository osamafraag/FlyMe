import React, { useState } from 'react';

const RoundTripResult = ({ flightData }) => {

  return (
    flightData.map((flight, index) => (
      <div key={index}>
        {flight}
      </div>
    ))
  );
};

export default RoundTripResult;