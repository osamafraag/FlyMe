import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import NoImage from "./../../Assets/Images/NoImage.jpg"

export default function HomeCard({data, navigation}) {
  return (
    <Card className="border border-0 text-start shadow w-100" onClick={() => navigation(data.id)}>
      {data.multi_images.length != 0
      ?
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
        {data.multi_images.map((image, index) => (
          <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
            <img src={image.photo} className="d-block w-100 rounded-top-2 " alt="..."  style={{height: '250px'}}/>
          </div>
        ))} 
        </div>
      </div>
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