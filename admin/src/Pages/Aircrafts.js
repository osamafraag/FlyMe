import { useState, useEffect, useContext, React} from 'react';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../APIs/Config";
import { AircraftsAPI } from './../APIs/Aircrafts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'react-bootstrap/Card';
import airbus from "./../Assets/Images/aircrafts/airbus.png";
import boeing from "./../Assets/Images/aircrafts/boeing.png";
import raytheon from "./../Assets/Images/aircrafts/raytheon.png";
import lockheed from "./../Assets/Images/aircrafts/lockheedMartin.png";
import {faWeightHanging, faPlane,faPersonWalkingLuggage,faTrash,faPenToSquare,faPlus,
        faPeopleGroup,faPlaneDeparture} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { Token } from "../Context/Token";

export default function Aircrafts() {
  const token = useSelector(state => state.Token.token);
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  const [aircrafts, setAircrafts] = useState([])
  const [errorMessage, setErrorMessage] = useState(false)
  function fetchData(){
    console.log(token)
    AircraftsAPI({Authorization: `Token ${token}`,})
        .then((result) => {
          setAircrafts(result.data)
          setErrorMessage(false)
        })
        .catch((error) => {
          console.log(error)
          setErrorMessage("Something gone wrong!")
        });
  }
  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
    else fetchData();
  }, [userData, navigate]);
 

  function handleAddClick() {navigate(`/AircraftForm`)}

  function handleEditClick(id){ navigate(`/AircraftForm`,{state:{id:id}})}

  function handleDeleteClick(aircraftId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this aircraft?");
    if (!confirmDelete) {
      return;
    }

    axiosInstance
    .delete(`/flights/api/aircrafts/${aircraftId}`, {
      headers: {Authorization: `Token ${token}`}
    }) 
    .then((response) => {
      fetchData()
      setErrorMessage(false)
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage("Something gone wrong!")
    });
  };

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

 return (
    <div className='container py-5 px-4'>
      {errorMessage && (
        <div className="error-message alert alert-danger mx-auto" style={{ fontSize: "15px", width:"700px" }}>
          {errorMessage}
        </div>
      )}
      <div className='d-flex mb-5'>
        <h3 className='text-start text-secondary'>Aircrafts</h3>
        <a className='btn ms-auto text-white' style={{backgroundColor: "var(--main-color)"}} onClick={handleAddClick}>Add New Aircraft <FontAwesomeIcon icon={faPlus} /></a>
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
                  <a className='btn btn-danger  ms-4' onClick={() => {handleDeleteClick(aircraft.id)}}>Delete <FontAwesomeIcon icon={faTrash} /></a>
                  <a className='btn border-0 ms-2 text-white' style={{backgroundColor: "var(--main-color)"}} onClick={() => {handleEditClick(aircraft.id)}}>Edit <FontAwesomeIcon icon={faPenToSquare} /></a>
                </Card.Body>
                
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}