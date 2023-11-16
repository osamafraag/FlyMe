import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlideContent from './Sliderr';
import Card from './TrendingCard';
import axios from 'axios';
import pic1 from './../../Assets/Images/newpic10.jpeg';
import pic2 from './../../Assets/Images/trippicI.jpeg';
import pic3 from './../../Assets/Images/newpic6.jpeg';
import pic4 from './../../Assets/Images/trippicIII.jpeg';
import pic5 from './../../Assets/Images/trippic4i.jpeg';
import pic6 from './../../Assets/Images/trippic5i.jpeg';
import pic7 from './../../Assets/Images/trippic6i.jpeg';
import pic8 from './../../Assets/Images/trippic7i.jpeg';
import { NavLink } from "react-router-dom";
import { Trending } from "./../../APIs/TrendingPlaces";
import { useNavigate } from "react-router-dom";

import './TripIdeas.css';

export default function TripIdeasComponent() {
  const navigate = useNavigate()
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
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  };

  const stopSlider = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPause();
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [trendingPlaces, setTrendingPlaces] = useState([]);
  // const API_BASE_URL = 'http://127.0.0.1:8000';

  const  params = useParams();
  useEffect(() => {
    Trending(params.id)
    .then((result) => {
      console.log(result.data)
      setTrendingPlaces(result.data)
      console.log(result.data)
    })
    .catch((error) => console.log(error));
    // const fetchTrendingPlaces = async () => {
    //   try {
    //     const response = await axios.get(`${API_BASE_URL}/countries/api/cities/${params.id}/trendingPlaces/`);
    //     setTrendingPlaces(response.data);
    //   } catch (error) {
    //     console.error('Error fetching trending visits:', error);
    //   }
    // };

    // if (selectedCityId) {
    //   fetchTrendingPlaces();
    // }
  }, []);


  const handleDetailsClick = (placeId) => {
    if (showDetails && selectedPlaceId === placeId) {
      // Hide the details section
      setShowDetails(false);
    } else {
      // Show the details section
      setSelectedPlaceId(placeId);
      setShowDetails(true);
    }
  };

  const handleNavigate = (name) => {
    navigate(`/Book?to=${name}`)
  }

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
      <button className='position-absolute top-0 start-0 text-decoration-none btn btn-dark slider-btn border-0 text-start' onClick={(name) => handleNavigate(trendingPlaces[0].cityName)} style={{backgroundColor: "var(--main-color)", marginLeft: "8rem", marginTop: "1.5rem"}}>Book Now</button>
      <h3 className="position-absolute top-50 start-50 slider-text text-center m-0 text-white" style={{transform: "translate(-50%,-50%)"}}>Travel Far Enough, You Meet Yourself</h3>
      </div>

      <div className="container py-5 m-5 ps-5">
        <h2 className="text-start pb-4">Trending Visits</h2>
        <div className="row row-cols-1 row-cols-lg-4 row-cols-md-2 g-4 justify-content-center align-items-center ">
          {trendingPlaces.slice(0, 4).map((place) => (
            <div className="col d-flex justify-content-center align-items-center" key={place.id}>
              <Card
                id={place.id}
                name={place.name}
                description={place.description}
                images={place.multi_images}
                onDetailsClick={() => handleDetailsClick(place.id)}
                showDetails={showDetails && selectedPlaceId === place.id}
              />
            </div>
            ))}
        </div>
        
        <div className='text-start py-5'>
          {showDetails  && (
              <div className="col">
                <div className="details-section">
                  <h2 className='pt-5 pb-3'> {trendingPlaces.find((place) => place.id === selectedPlaceId)?.name}</h2>
                  <p className='ps-5'> {trendingPlaces.find((place) => place.id === selectedPlaceId)?.description}.</p>
                  {/* Add any additional content or components for the details section */}
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}