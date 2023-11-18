import {useEffect, useState, React} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosInstance } from "../APIs/Config";
import { AirportsAPI } from './../APIs/AirPorts'
import { AircraftsAPI } from './../APIs/Aircrafts'
import {faPlaneArrival, faPlane,faPlaneDeparture,faDollarSign,faClock,faMoneyBills} from '@fortawesome/free-solid-svg-icons';


function FlightForm() {

  const navigate = useNavigate()
  const location = useLocation()
  const [airports,setAirports]=useState([])
  const [aircrafts,setAircrafts]=useState([])
  const [flight,setFlight]=useState({aircraft:null,departureTime:null,arrivalTime:null,
  startAirport:null,endAirport:null,distance:0,avalableSeats:0,baseCost:null,status:'A'})

  useEffect(() => {
    AirportsAPI()
    .then((result) => {
      setAirports(result.data)
    })
    .catch((error) => console.log(error));},[]);

  useEffect(() => {
    AircraftsAPI()
    .then((result) => {
        setAircrafts(result.data)
    })
    .catch((error) => console.log(error));},[]);

  useEffect(() => {
    axiosInstance
        .get(`flights/api/${location.state?.id}`)
        .then((result) => {
          setFlight(result.data.data)
        })
        .catch((error) => console.log(error));
  },[])

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFlight({
      ...flight,
      [name]: value,
    });
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    location.state?
    axiosInstance
        .put(`/flights/api/${location.state.id}`, flight)  
        .then((response) => {
          navigate(`/Flights`);
        })
        .catch((error) => {
          console.error(error.response.data.errors);
        })
        :
    axiosInstance
        .post("flights/api/", flight)
        .then((response) => {
          navigate(`/Flights`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    }
  return (
    <div className='container p-5 '>
    <form onSubmit={onSubmit} className="border border-0 text-start shadow w-100">
    <div className='container p-5'>
      <div class="input-group mx-auto w-75">
        <span class="input-group-text" for="inputGroupSelect01">Aircraft<pre>  </pre>  <FontAwesomeIcon icon={faPlane}/> </span>
        <select class="form-select" id="inputGroupSelect01" required value={flight?.aircraft} name='aircraft'
        onChange={handleInputChange}>
        {aircrafts?.map((aircraft, index) => {
            return(<option value={aircraft.id}>{aircraft.name}</option>)})}
        </select>
      </div>
      <div class="input-group mx-auto w-75 mt-3">
        <span class="input-group-text" for="inputGroupSelect02">Start Airport <pre>  </pre> <FontAwesomeIcon icon={faPlaneDeparture} /> </span>
        <select class="form-select" id="inputGroupSelect02" required value={flight?.startAirport} name='startAirport'
        onChange={handleInputChange}>
        {airports?.map((airport, index) => {
            return(<option value={airport.id}>{airport.name}</option>)})}
        </select>
      </div>
      <div class="input-group mx-auto w-75 mt-3">
        <span class="input-group-text" for="inputGroupSelect03">Destination Airport <pre>  </pre> <FontAwesomeIcon icon={faPlaneArrival} /> </span>
        <select class="form-select" id="inputGroupSelect03" required value={flight?.endAirport} name='endAirport'
        onChange={handleInputChange}>
        {airports?.map((airport, index) => {
            return(<option value={airport.id}>{airport.name}</option>)})}
        </select>
      </div>
      <div class="input-group form-floating mx-auto w-75 mt-3">
        <span class="input-group-text" for="inputGroup4">Departure Time<pre>  </pre>  <FontAwesomeIcon icon={faClock} /></span>
        <input type="datetime-local" class="form-control" id="inputGroup4" required name='departureTime'
        onChange={handleInputChange}/>
      </div>
      <div class="input-group form-floating mx-auto w-75 mt-3">
        <span class="input-group-text" for="inputGroup5">Arrival Time<pre>  </pre> <FontAwesomeIcon icon={faClock} /></span>
        <input type="datetime-local" class="form-control" id="inputGroup5" required name='arrivalTime'
        onChange={handleInputChange}/>
      </div>
      <div class="input-group mx-auto w-75 my-3">
      <span class="input-group-text" for="baseCost">Cost<pre>  </pre> <FontAwesomeIcon icon={faMoneyBills} /></span>
        <input type="number" class="form-control" required value={flight?.baseCost} name='baseCost'
        onChange={handleInputChange}/>
        <span class="input-group-text"><FontAwesomeIcon icon={faDollarSign} /></span>
      </div>
      <div className='input-group mx-auto'>
        <button type="submit" className='btn mx-auto text-white border-0 ' style={{backgroundColor: "var(--main-color)"}}>
          {location.state? <span>Edit Flight</span> :<span>Add Flight</span> } 
        </button>
      </div>
      </div>
    </form>
    </div>
  );
}

export default FlightForm;