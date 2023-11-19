import "./AboutUs.css"
import React from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlideContent from './Sliderr'
import SecondSlideContent from './sliderr2'
import pic3 from './../../Assets/Images/pic1.png'
import pic2 from './../../Assets/Images/newpic6.jpeg'
import pic1 from './../../Assets/Images/newpic5.jpeg'
import pic4 from './../../Assets/Images/newpic2.jpeg'
import pic5 from './../../Assets/Images/trippic4i.jpeg';
import pic6 from './../../Assets/Images/newpic4.jpeg';
import pic7 from './../../Assets/Images/trippic6i.jpeg';
import pic8 from './../../Assets/Images/trippic7i.jpeg';
import  { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlaneCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {faEarthAmericas} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';



export default function AboutUsComponent() {
  
  const slides = [
    {
      image: pic1,
      title: 'Slide 1',
    },
    {
      image: pic2,
      title: 'Slide 2',
    },
    {
      image: pic3,
      title: 'Slide 3',
    },
    {
      image: pic4,
      title: 'Slide 3',
    },
    {
      image: pic5,
      title: 'Slide 3',
    },
    {
      image: pic6,
      title: 'Slide 3',
    },
    {
      image: pic8,
      title: 'Slide 3',
    },
    {
      image: pic7,
      title: 'Slide 3',
    },
    
  ];

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  // const sliderRef = useRef(null);
  const slider1Ref = useRef(null);
  const slider2Ref = useRef(null);

  useEffect(() => {
    startSlider();
    return () => {
      stopSlider();
    };
  }, []);

  const startSlider = () => {
    // Start the slider automatically
    // sliderRef.current.slickPlay();
    if (slider1Ref.current) {
      slider1Ref.current.slickPlay();
    }
    if (slider2Ref.current) {
      slider2Ref.current.slickPlay();
    }
  };

  const stopSlider = () => {
    // Stop the slider
    // sliderRef.current.slickPause();
    if (slider1Ref.current) {
      slider1Ref.current.slickPause();
    }
    if (slider2Ref.current) {
      slider2Ref.current.slickPause();
    }
  };

  const slider1Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slider2Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <>
    <div className='position-relative '>
      <div className="container ">
        <Slider ref={slider1Ref} {...slider1Settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <SlideContent
                image={slide.image}
                // title={slide.title}
              />
            </div>
          ))}
        </Slider>
      </div>
      <h3 className="position-absolute top-50 start-50 slider-text text-center m-0 text-white" style={{transform: "translate(-50%,-50%)"}}>Travel brings power and love back into your life .</h3>
    </div>

      <div className="text-center pb-5 ps-4">

        <div className="container py-5 my-5">
          <h2 className="text-start">Why Fly Me ?</h2>
          <p className=" py-3  text"> We’re on a mission to help people discover the real value of travel — to inspire, to give more reasons, to make it easy — for you to go. Our company was founded back in 2005, and since then, we’ve imagined and created some of the most well-loved products for travelers all around the world.</p>
          <p className=" text">Today, Fly Me is used by thousands of people every month — people who travel for adventure, for work, for family, and for many other reasons. That’s why we work tirelessly to make your experience of planning and booking flights as seamless as possible.</p>
          <p  className=" text">Fly Me is more than just an app, a website, or a company. Fly Me is an idea and belief that everyone has an innate desire and yearning to travel — to experience, live, and grow.

          So ingrained is this idea of the human need to travel that we’ve woven this emotional and eternal question of “Why do we need to travel?” into the name of our organization — Fly Me.</p>

        </div>

        <div className="container py-5 my-5">
          <div className="row">
            <div className="col me-5">
              <h2 className="text-start">Our Mission</h2>
              <p className=" py-5 text">We firmly believe that by helping people travel more, explore the world and experience diversity, we create a meaningful socio-economic impact.</p>
              <div className="stylle">
                <p className="quote text-start px-5 pt-4 text-dark">"</p>
                <p  className=" quote-text px-5">Travel is fatal to prejudice, bigotry, and narrow-mindedness, and many of our people need it sorely on these accounts. Broad, wholesome, charitable views of men and things cannot be acquired by vegetating in one little corner of the earth all one’s lifetime.</p>
                <p className="text-end pt-3 px-5">Mark Twain, 1869</p>
              </div>
            </div>
            <div className="col">
              <h2 className="text-start ">Fly Me’s Core Values</h2>

              <div className="d-flex">
                <FontAwesomeIcon icon={faPlaneCircleCheck} className='fs-5 icon text-start pt-5 me-2' />
                <h5 className="text-start pt-5">Love travel and technology</h5>
              </div>
              <p className=" py-2 text">We pride ourselves on being both explorers and geeks</p>

              <div className="d-flex">
                <FontAwesomeIcon icon={faThumbsUp} className='fs-5 icon text-start pt-3 me-2' />
                <h5 className="text-start pt-3">Promote meritocracy</h5>
              </div>
              <p className=" py-2 text">Advancement based on achievement and attitude not tenure or pedigree</p>

              <div className="d-flex">
                <FontAwesomeIcon icon={faEarthAmericas} className='fs-5 icon text-start pt-3 me-2' />
                <h5 className="text-start pt-3">Use global benchmarks</h5>
              </div>
              <p className=" py-2 text">We want to be the world’s best at what we do, not just local champions</p>
            </div>
          </div>
        </div>
        <div className="container pb-5">
          <Slider ref={slider2Ref} {...slider2Settings}>
            {slides.map((slide, index) => (
              <div key={index}>
                <SecondSlideContent
                  image={slide.image}
                  // title={slide.title}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="container py-5 my-5">
          <h2 className="text-start">Terms and Conditions</h2>
          <p className=" py-3  text"> When searching for airfares , discount and savings claims are based on multiple factors, including searching over 500 airlines to find our available fare . coupon codes are valid for savings for qualified bookings off our service fees . </p>
          <div className="d-flex">
            <p className="pb-3 text w-auto "> For more information, go to : </p>
            <NavLink className='me-3 fw-semibold text-decoration-none linkk' to="/TermsAndConditions">Terms and Conditions</NavLink>
          </div>
        </div>
      </div>

      

      {/* <div className="container-fluid py-3 ">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100 h-25" src={pic1} alt="First slide"/>
              <div className="carousel-caption">
              <h3>Slide 1</h3>
              <p className="text-dark centered-text">This is the caption for slide 1</p>
              <div className="centered-text">Centered Text</div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={pic2} alt="Second slide"/>
              <div className="carousel-caption">
              <h3>Slide 2</h3>
              <p className="text-dark">This is the caption for slide 2</p>
              <div className="centered-text">Centered Text</div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={pic3} alt="Third slide"/>
              <div className="carousel-caption">
              <h3>Slide 3</h3>
              <p className="text-dark">This is the caption for slide 3</p>
              <div className="centered-text">Centered Text</div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div> */}

      
    </>
    )
}