import "./AboutUs.css"
import React from 'react'




const SecondSlideContent = ({ image, title }) => {
    return (
       <div className="slider-container p-0 m-0">
        {/* <div className="slider-text">Travel brings power and love back into your life .</div> */}
        <img src={image} alt={title} className="slider-image " />
        <h3>{title}</h3>
      </div>
    );
  };

  export default SecondSlideContent;