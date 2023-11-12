// import "./TripIdeas.css"
// import React from 'react'
// import { NavLink } from "react-router-dom";




// const SlideContent = ({ image, title }) => {
//     return (
//        <div className="slider-container p-0 m-0">
//         <NavLink className='me-3 text-decoration-none btn btn-outline-light slider-btn' to="/Book">Book Now</NavLink>
//         <div className="slider-text">Trip Ideas ..</div>
//         <img src={image} alt={title} className="slider-image " />
//         <h3>{title}</h3>
//       </div>
//     );
//   };

//   export default SlideContent;

import "./TripIdeas.css";
import React from 'react';

const SlideContent = ({ image, title }) => {
  const slideStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px',
  };

  return (
    <div className="slider-container p-0 m-0" style={slideStyle}>
      
      <h3>{title}</h3>
    </div>
  );
};

export default SlideContent;