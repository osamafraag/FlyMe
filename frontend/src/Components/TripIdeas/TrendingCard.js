// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEye , faEyeSlash} from '@fortawesome/free-solid-svg-icons'

// const Card = ({ imageSrc, title, description, handleDetailsClick, showDetails }) => {
//   return (
//     <div className="card border border-0 text-start shadow w-100">
//       <div className="card-image">
//         <img src={imageSrc} className="card-img-top" alt="Card" style={{height: '250px'}} />
//       </div>
//       <div className="card-content">
//         <h5 className="card-title ps-2 pt-3">{title}</h5>
//         <p className="card-description ps-2">{description}</p>
//         <button className="card-btn btn border-0" onClick={handleDetailsClick}>
//           {showDetails ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "var(--main-color)"}}/> : <FontAwesomeIcon icon={faEye} style={{color: "var(--main-color)"}}/>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye , faEyeSlash} from '@fortawesome/free-solid-svg-icons'

const Card = ({ id ,images, name, description, onDetailsClick, showDetails }) => {
  return (
    <div className="card border border-0 text-start shadow w-100">
      <div className="card-image">
        <img src={images[0]} className="card-img-top" alt="Card" style={{height: '250px'}} />
      </div>
      <div className="card-content">
        <h5 className="card-title ps-2 pt-3">{name}</h5>
        <p className="card-description ps-2">{description}</p>
        <button className="card-btn btn border-0" onClick={onDetailsClick}>
          {showDetails ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "var(--main-color)"}}/> : <FontAwesomeIcon icon={faEye} style={{color: "var(--main-color)"}}/>}
        </button>
      </div>
    </div>
  );
};

export default Card;