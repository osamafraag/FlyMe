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
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const Card = ({ id ,images, name, description, onDetailsClick, showDetails }) => {
  return (
    <div className="card border border-0 text-start shadow w-100">
      <div className="card-image">
        {/* <img src={images[0]} className="card-img-top" alt="Card" style={{height: '250px'}} /> */}
          <AliceCarousel  animationDuration={1000}
                          autoPlay
                          autoPlayInterval={3000}
                          disableButtonsControls
                          infinite
                          mouseTracking
                          slideSpacing={10}>
            {images.map((image, index) => (
              <div  key={index}>
                <img src={`http://127.0.0.1:8000/${image.photo}`} className="d-block w-100 rounded-top-2 " alt="..."  style={{height: '250px'}}/>
              </div>
            ))}
          </AliceCarousel>
      </div>
  
      <div className="card-content px-3 pb-3">
        <h5 className="card-title ps-2 pt-3">{name.substr(0,20)}</h5>
        <button className="card-btn btn border-0 text-end" onClick={onDetailsClick}>
          {showDetails ? <FontAwesomeIcon icon={faEyeSlash} style={{color: "var(--main-color)"}}/> : <FontAwesomeIcon icon={faEye} style={{color: "var(--main-color)"}}/>}
        </button>
      </div>
    </div>
  );
};

export default Card;