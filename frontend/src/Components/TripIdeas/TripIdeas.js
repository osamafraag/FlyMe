// import "./TripIdeas.css"
// import React from 'react'
// import Slider from "react-slick"
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import SlideContent from './Sliderr'
// import Card from './TrendingCard'
// import  { useRef } from 'react';
// import { useState, useEffect } from "react";
// import axios from 'axios';
// import pic1 from './../../Assets/Images/trippic0.jpeg'
// import pic2 from './../../Assets/Images/trippicI.jpeg'
// import pic3 from './../../Assets/Images/trippicII.jpeg'
// import pic4 from './../../Assets/Images/trippicIII.jpeg'
// import pic5 from './../../Assets/Images/trippic4i.jpeg'
// import pic6 from './../../Assets/Images/trippic5i.jpeg'
// import pic7 from './../../Assets/Images/trippic6i.jpeg'
// import pic8 from './../../Assets/Images/trippic7i.jpeg'

// export default function TripIdeasComponent() {

//   const slides = [
//     {
//       image: pic1,
//       title: 'Slide 1',
//       description: 'loremmm',
//     },
//     {
//       image: pic2,
//       title: 'Slide 2',
//       description: 'loremmm',
//     },
//     {
//       image: pic3,
//       title: 'Slide 3',
//       description: 'loremmm',
//     },
//     {
//       image: pic4,
//       title: 'Slide 4',
//       description: 'loremmm',
//     },
//     {
//       image: pic5,
//       title: 'Slide 5',
//       description: 'loremmm',
//     },
//     {
//       image: pic6,
//       title: 'Slide 6',
//       description: 'loremmm',
//     },
//     {
//       image: pic7,
//       title: 'Slide 7',
//       description: 'loremmm',
//     },
//     {
//       image: pic8,
//       title: 'Slide 8',
//       description: 'loremmm',
//     }
//   ];

//   const sliderRef = useRef(null);

//   useEffect(() => {
//     startSlider();
//     return () => {
//       stopSlider();
//     };
//   }, []);

//   const startSlider = () => {
//     sliderRef.current.slickPlay();
//   };

//   const stopSlider = () => {
//     sliderRef.current.slickPause();
//   };
  
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

  
  
//   const [trendingVisits, setTrendingVisits] = useState([]);

//   useEffect(() => {
//     const fetchTrendingVisits = async () => {
//       try {
//         const response = await axios.get('API_ENDPOINT_URL');
//         setTrendingVisits(response.data);
//       } catch (error) {
//           console.error('Error fetching trending visits:', error);
//       }
//     };
    
//     fetchTrendingVisits();
//   }, []);

//     return (
//       <>

//       <div className="container ">
//         <Slider ref={sliderRef} {...sliderSettings}>
//           {slides.map((slide, index) => (
//             <div key={index}>
//               <SlideContent
//                 image={slide.image}
//                 // title={slide.title}
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>


//         <div className="container py-5 m-5">
//           <h2 className="text-start pb-4">Trending Visits</h2>
//           <div className="row">
//             <div className="col">
//               {slides.map((slide, index) => (
//                 <div key={index}>
//                   <Card
//                     imageSrc={slide.image}
//                     title={slide.title}
//                     description={slide.description}
//                     handleDetailsClick={() => handleDetailsClick(index)}
//                   />
//                 </div>
//               ))}
//             </div>
//             {showDetails && selectedSlideIndex !== null && (
//               <div className="col">
//                 <div className="details-section">
//                   <h6>Details Section for {slides[selectedSlideIndex].title}</h6>
//                   <p>This is the detailed information about {slides[selectedSlideIndex].title}.</p>
//                   {/* Add any additional content or components for the details section */}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
      
//       </>
//     )
// }

import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlideContent from './Sliderr';
import Card from './TrendingCard';
import axios from 'axios';
import pic1 from './../../Assets/Images/trippic0.jpeg';
import pic2 from './../../Assets/Images/trippicI.jpeg';
import pic3 from './../../Assets/Images/trippicII.jpeg';
import pic4 from './../../Assets/Images/trippicIII.jpeg';
import pic5 from './../../Assets/Images/trippic4i.jpeg';
import pic6 from './../../Assets/Images/trippic5i.jpeg';
import pic7 from './../../Assets/Images/trippic6i.jpeg';
import pic8 from './../../Assets/Images/trippic7i.jpeg';
import { NavLink } from "react-router-dom";

import './TripIdeas.css';

export default function TripIdeasComponent() {
  const slides = [
    {
      image: pic1,
      title: 'Slide 1',
      description: 'loremmm',
    },
    {
      image: pic2,
      title: 'Slide 2',
      description: 'loremmm',
    },
    {
      image: pic3,
      title: 'Slide 3',
      description: 'loremmm',
    },
    {
      image: pic4,
      title: 'Slide 4',
      description: 'loremmm',
    },
    {
      image: pic5,
      title: 'Slide 5',
      description: 'loremmm',
    },
    {
      image: pic6,
      title: 'Slide 6',
      description: 'loremmm',
    },
    {
      image: pic7,
      title: 'Slide 7',
      description: 'loremmm',
    },
    {
      image: pic8,
      title: 'Slide 8',
      description: 'loremmm',
    },
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    startSlider();
    return () => {
      stopSlider();
    };
  }, []);

  const startSlider = () => {
    sliderRef.current.slickPlay();
  };

  const stopSlider = () => {
    sliderRef.current.slickPause();
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [trendingVisits, setTrendingVisits] = useState([]);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchTrendingVisits = async () => {
      try {
        const response = await axios.get('API_ENDPOINT_URL');
        setTrendingVisits(response.data);
      } catch (error) {
        console.error('Error fetching trending visits:', error);
      }
    };

    fetchTrendingVisits();
  }, []);

  // const handleDetailsClick = (index) => {
  //   setSelectedSlideIndex(index);
  //   setShowDetails(true);
  // };
  const handleDetailsClick = (index) => {
    if (showDetails && selectedSlideIndex === index) {
      // Hide the details section
      setShowDetails(false);
    } else {
      // Show the details section
      setSelectedSlideIndex(index);
      setShowDetails(true);
    }
  };

  return (
    <>
    <div className='position-relative '>
      <div className="container">
        <Slider ref={sliderRef} {...sliderSettings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <SlideContent image={slide.image} />
            </div>
          ))}
        </Slider>
      </div>
      <NavLink className='position-absolute top-0 start-0 text-decoration-none btn btn-dark slider-btn border-0 text-start' to="/Book" style={{backgroundColor: "var(--main-color)", marginLeft: "8rem", marginTop: "1rem"}}>Book Now</NavLink>
      <h3 className="position-absolute top-50 start-50 slider-text text-center m-0 text-white" style={{transform: "translate(-50%,-50%)"}}>Trip Ideas ..</h3>
      </div>

      <div className="container py-5 m-5 ps-5">
        <h2 className="text-start pb-4">Trending Visits</h2>
        <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4 justify-content-center align-items-center ">
          {slides.map((slide, index) => (
            <div className="col d-flex justify-content-center align-items-center" key={index}>
              <Card
                imageSrc={slide.image}
                title={slide.title}
                description={slide.description}
                handleDetailsClick={() => handleDetailsClick(index)}
                showDetails={showDetails && selectedSlideIndex === index}
              />
            </div>
            ))}
        </div>
        
        <div className='text-start py-5'>
          {showDetails && selectedSlideIndex !== null && (
              <div className="col">
                <div className="details-section">
                  <h2 className='pt-5 pb-3'>Details Section for {slides[selectedSlideIndex].title}</h2>
                  <p className='ps-5'>This is the detailed information about {slides[selectedSlideIndex].title}.</p>
                  {/* Add any additional content or components for the details section */}
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}