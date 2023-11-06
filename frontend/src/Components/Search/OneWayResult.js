import React, { useState } from 'react';

const OneWayResult = ({ flightData }) => {

  return (
    flightData.map((flight, index) => (
      <div key={index}>
        {flight}
      </div>
    ))
  );
};

export default OneWayResult;