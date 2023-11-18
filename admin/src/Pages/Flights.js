import { useState, useEffect, React } from 'react';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../APIs/Config";
import { FlightsAPI } from './../APIs/Flights'
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faPenToSquare, faTrash,faBan, faCircle } from '@fortawesome/free-solid-svg-icons';
import FlightCard from '../Components/Flights/FlightCard'
import { useSelector } from 'react-redux';

export default function Flights() {

  const navigate = useNavigate()
  const [flights, setFlights] = useState({})
  let userData = useSelector(state => state.loggedInUserSlice.data);

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
    else
    fetchData()
  },[userData, navigate]);

  function fetchData(){
    FlightsAPI()
        .then((result) => {
          setFlights(result.data)
          console.log(result.data)
        })
        .catch((error) => console.log(error));
  }
  

  function handlePostponeClick(id){navigate(`/PostponeForm`,{state:{id:id}})}

  function handleCancelClick(id){
    const confirmDelete = window.confirm("Are you sure you want to Cancel this flight?");
    if (!confirmDelete) {
      return;
    }
    axiosInstance
        .get(`flights/api/${id}`)
        .then((result) => {
          result.data.data.status = 'C'
          axiosInstance
            .put(`/flights/api/${id}`, result.data.data)  
            .then((response) => {
              fetchData()
            })
            .catch((error) => {
            console.error(error.response);
          })
        })
        .catch((error) => console.log(error));
  }
 
  function handleAddClick() {navigate(`/FlightForm`)}

  function handleDeleteClick(flightId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this flight?");
    if (!confirmDelete) {
      return;
    }

    axiosInstance
    .delete(`/flights/api/${flightId}`)  
    .then((response) => {
      fetchData()
    })
    .catch((error) => {
      console.error(error);
    });
  };

 return (
    <div className='container p-5'>
      <div className='d-flex mb-5'>
        <h3 className='text-start text-secondary'>Flights</h3>
        <a className='btn ms-auto text-white' style={{backgroundColor: "var(--main-color)"}} onClick={()=>{handleAddClick()}}><FontAwesomeIcon icon={faPlus} /> Add New Flight</a>
      </div>
      <div className='row'>
        <div className='col col-4'>
          <h4 className='text-center text-secondary m-4'>Passed Flights</h4>
          {flights.passed?.map((flight, index) => {
          return (
            <Card className=" border border-0 text-start shadow mx-auto w-75 mb-3 py-3 text-center"> 
              <FlightCard flight={flight} />
              <a className='btn btn-danger m-2 mx-auto' onClick={() => {handleDeleteClick(flight.id)}}>
                Delete <FontAwesomeIcon icon={faTrash} /></a>
                 
            </Card>
          )})}
        </div>
        <div className='col col-4'>
          <h4 className='text-center text-secondary m-4'>Live Flights
           <FontAwesomeIcon icon={faCircle} className='text-success mx-3 fs-5'/></h4>
          {flights.live?.map((flight, index) => {
          return (
            <Card className=" border border-0 text-start shadow mx-auto w-75 mb-3 py-3"> 
              <FlightCard flight={flight} />
            </Card>
          )})}
        </div>
        <div className='col col-4'>
          <h4 className='text-center text-secondary m-4'>Comming Flights</h4>
          {flights.comming?.map((flight, index) => {
          return (
            <Card className=" border border-0 text-start shadow mx-auto w-75 mb-3 py-3"> 
              <FlightCard flight={flight} />
              <div className='d-flex justify-content-center align-items-center'>
              <a className='btn m-2 w-50 text-white' style={{backgroundColor: "var(--main-color)"}} onClick={() => {handlePostponeClick(flight.id)}}>
                Postpone <FontAwesomeIcon icon={faPenToSquare} /></a>
              <a className='btn btn-warning m-2 w-25' onClick={() => {handleCancelClick(flight.id)}}>
               <FontAwesomeIcon icon={faBan} /></a>
              </div>
              
            </Card>
          )})}
        </div>
        <hr class="hr hr-blurry my-4"/>
        <div className='row'>
        <h4 className='text-start text-secondary m-4'>Cancelled Flights</h4>
        {flights.cancled?.map((flight, index) => {
        return (
        <div className='col col-4'>
         <Card className=" border border-0 text-start shadow mx-auto w-75 mb-3 py-3"> 
            <FlightCard flight={flight} />
            <a className='btn btn-danger m-2 mx-auto' onClick={() => {handleDeleteClick(flight.id)}}>
                Delete <FontAwesomeIcon icon={faTrash} /></a>
          </Card>
        </div>
        )})}
      </div>
      </div>
    </div>
  )
}