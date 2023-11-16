import React from 'react'
import { useState, useEffect } from 'react';
import { AircraftsAPI } from './../APIs/Aircrafts'
import Card from 'react-bootstrap/Card';
import {faWeightHanging, faPlane,faPersonWalkingLuggage,faTrash,faPenToSquare,faPlus,
  faPeopleGroup,faPlaneDeparture} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import airbus from "./../Assets/Images/aircrafts/airbus.png"
import boeing from "./../Assets/Images/aircrafts/boeing.png"
import raytheon from "./../Assets/Images/aircrafts/raytheon.png"
import lockheed from "./../Assets/Images/aircrafts/lockheedMartin.png"
import { useNavigate } from "react-router-dom";
    
export default function Aircrafts() {
  const navigate = useNavigate()
  const [aircrafts, setAircrafts] = useState([])

  function handleClick() {
    navigate(`/AircraftForm`);
  }
  
  useEffect(() => {
    AircraftsAPI()
      .then((result) => {
        setAircrafts(result.data)
      })
      .catch((error) => console.log(error));
    },[]);

 return (
    <div className='container p-5'>
      <div className='d-flex mb-5'>
        <h3 className='text-start text-secondary'>Aircrafts</h3>
        <a className='btn btn-info ms-auto' onClick={handleClick}>Add new aircraft <FontAwesomeIcon icon={faPlus} /></a>
      </div>
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 justify-content-center align-items-center ">
        {aircrafts?.map((aircraft, index) => {
          if (aircraft.company === 'L') {var path = lockheed} 
          else if (aircraft.company === 'A') {var path = airbus}
          else if (aircraft.company === 'B') {var path = boeing}
          else if (aircraft.company === 'R') {var path = raytheon}
          return (
            <div className="d-flex justify-content-center align-items-center" key={index}>
              <Card className="border border-0 text-start shadow w-100">
                <Card.Body>
                  <div className='d-flex'>
                    <Card.Title className='my-auto'>{aircraft.name}</Card.Title>
                    <Card.Img className='ms-auto' variant="top" src={path} style={{height: '80px', width:'100px'}} />
                  </div>
                  <div className='row justify-content-center align-items-center'>
                    <div className='col justify-content-center text-center'>
                      <FontAwesomeIcon icon={faWeightHanging} /><p>{aircraft.maxLoad} Ton</p><br/>
                      <FontAwesomeIcon icon={faPlane} /><p>{aircraft.maxDistance} KM</p><br/>
                    </div>
                    <div className='col justify-content-center text-center'>
                      <FontAwesomeIcon icon={faPersonWalkingLuggage}/><p>{aircraft.baggageWeight} KG</p><br/>
                      <FontAwesomeIcon icon={faPeopleGroup}/><p>{aircraft.capacity} Passenger</p><br/>
                    </div>
                  </div>
                  <small className="text-muted mt-4"><FontAwesomeIcon icon={faPlaneDeparture} style={{color: "var(--main-color)"}}/> Fly Me</small>
                  <a className='btn btn-danger ms-4'>Delete <FontAwesomeIcon icon={faTrash} /></a>
                  <a className='btn btn-primary ms-2'>Edit <FontAwesomeIcon icon={faPenToSquare} /></a>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}