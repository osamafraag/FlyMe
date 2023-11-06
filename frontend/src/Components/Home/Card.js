import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

export default function HomeCard({data, navigation}) {
  return (
    <Card className="border border-0 text-start shadow w-100" onClick={() => navigation(data.id)}>
      <Card.Img variant="top" src={data.image} style={{height: '200px'}} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          This is a wider card with supporting text below as a natural lead-in.
        </Card.Text> 
        <small className="text-muted"><FontAwesomeIcon icon={faPlaneDeparture} style={{color: "var(--main-color)"}}/> Fly Me</small>  
      </Card.Body>
    </Card>
  )
}