import "./AboutUs.css"
import React from 'react'




// const SlideContent = ({ image, title }) => {
//     return (
//        <div className="slider-container p-0 m-0">
//         <div className="slider-text">Travel brings power and love back into your life .</div>
//         <img src={image} alt={title} className="slider-image " />
//         <h3>{title}</h3>
//       </div>
//     );
//   };

const SlideContent = ({ image, title }) => {
  const slideStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: '100% 100%',
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