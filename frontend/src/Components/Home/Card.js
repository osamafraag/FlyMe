import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import NoImage from "./../../Assets/Images/NoImage.jpg"

export default function HomeCard({data, navigation}) {
  return (
    <Card style={{ width: '18rem' }} className="border border-0 text-start shadow w-100" onClick={() => navigation(data.id)}>
      {data.multi_images.length != 0 
      ?
      <Carousel controls={false} indicators={false} data-bs-theme="dark">
        {data.multi_images.map((image, index) => (
        <Carousel.Item variant="top" key={index}>
          <img
            className="d-block w-100 rounded-top-2"
            src={image.photo}
            alt={image.place_name}
            style={{height: "250px"}}
          />
        </Carousel.Item>
        ))}
      </Carousel>
      :
      <Card.Img variant="top" src={NoImage} style={{height: '250px'}} />
      }
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <small className="text-muted mt-4"><FontAwesomeIcon icon={faPlaneDeparture} style={{color: "var(--main-color)"}}/> Fly Me</small>
      </Card.Body>
    </Card>
  )
}