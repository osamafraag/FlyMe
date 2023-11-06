import React, { useState } from 'react';

const MultiCityResult = ({ flightData }) => {

  return (
    flightData.map((flight, index) => (
      <div key={index}>
        {flight}
      </div>
    ))
  );
};

export default MultiCityResult;