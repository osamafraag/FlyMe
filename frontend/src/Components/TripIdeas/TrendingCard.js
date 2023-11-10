// import React from 'react'
// import { useState } from "react";

// const Card = ({ imageSrc, title, description }) => {
   
//     const [selectedSlideIndex, setSelectedSlideIndex] = useState(null);
//     const [showDetails, setShowDetails] = useState(false);
  
//     const handleDetailsClick = () => {
//       // setShowDetails(!showDetails);
//       setSelectedSlideIndex(index);
//       setShowDetails(true);
//     };
  
//     return (

//       <div className="card">
//         <div className="card-image">
//           <img src={imageSrc} className="card-img-top" alt="Card" />
//         </div>
//         <div className="card-content">
//           <h5 className="card-title">{title}</h5>
//           <p className="card-description">{description}</p>
//           <button className="card-btn" onClick={handleDetailsClick}>
//             {showDetails ? 'Hide Details' : 'Show Details'}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   export default Card;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye , faEyeSlash} from '@fortawesome/free-solid-svg-icons'

const Card = ({ imageSrc, title, description, handleDetailsClick, showDetails }) => {
  return (
    <div className="card border border-0 text-start shadow w-100">
      <div className="card-image">
        <img src={imageSrc} className="card-img-top" alt="Card" style={{height: '200px'}} />
      </div>
      <div className="card-content">
        <h5 className="card-title">{title}</h5>
        <p className="card-description">{description}</p>
        <button className="card-btn btn border-0" onClick={handleDetailsClick}>
          {showDetails ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "var(--main-color)"}}/> : <FontAwesomeIcon icon={faEye} style={{color: "var(--main-color)"}}/>}
        </button>
      </div>
    </div>
  );
};

export default Card;