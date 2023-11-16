import React from 'react'
import { useState, useEffect } from 'react';
import { FlightsAPI } from './../APIs/Flights'
import Card from 'react-bootstrap/Card';
import {faWeightHanging, faPlane,faPersonWalkingLuggage,faTrash,faPenToSquare,faPlus,
  faPeopleGroup,faPlaneDeparture} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    
export default function Flights() {
  const [flights, setFlights] = useState({})

  useEffect(() => {
    FlightsAPI()
      .then((result) => {
        setFlights(result.data)
      })
      .catch((error) => console.log(error));
    },[]);

 return (
    <div className='container p-5'>
      <div className='d-flex mb-5'>
        <h3 className='text-start text-secondary'>Flights</h3>
        <a className='btn btn-info ms-auto' >Add new Flight <FontAwesomeIcon icon={faPlus} /></a>
      </div>
      <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 g-4 justify-content-center align-items-center ">
        {flights.passed?.map((flight, index) => {
          return (
            <div className="d-flex justify-content-center align-items-center" key={index}>
              <p>{flight.from}</p>
              {/* <Card className="border border-0 text-start shadow w-100">
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
              </Card> */}
            </div>
          )
        })}
        {flights.live?.map((flight, index) => {
          return (
            <div className="d-flex justify-content-center align-items-center" key={index}>
              <p>{flight.from}</p>
              {/* <Card className="border border-0 text-start shadow w-100">
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
              </Card> */}
            </div>
          )
        })}
        {flights.canceled?.map((flight, index) => {
          return (
            <div className="d-flex justify-content-center align-items-center" key={index}>
              <p>{flight.from}</p>
              {/* <Card className="border border-0 text-start shadow w-100">
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
              </Card> */}
            </div>
          )
        })}
        {flights.comming?.map((flight, index) => {
          return (
            <div className="d-flex justify-content-center align-items-center" key={index}>
              <p>{flight.from}</p>
              {/* <Card className="border border-0 text-start shadow w-100">
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
              </Card> */}
            </div>
          )
        })}
      </div>
    </div>
  )
}