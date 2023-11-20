import { useState, useEffect, React } from 'react';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../APIs/Config";
import { FlightsAPI } from './../APIs/Flights'
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faPenToSquare, faTrash,faBan, faCircle,faPercent ,faTag, faClock} from '@fortawesome/free-solid-svg-icons';
import FlightCard from '../Components/Flights/FlightCard'
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Flights() {
  const token = useSelector(state => state.Token.token);
  const navigate = useNavigate()
  const [showOffer, setShowOffer] = useState(false);
  const [showPostpone, setShowPostpone] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState({aircraft:null,departureTime:null,arrivalTime:null,
    startAirport:null,endAirport:null,distance:0,avalableSeats:0,baseCost:0,status:'A',offerPercentage:0});
  const [offer, setOffer] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [flights, setFlights] = useState({})
  let userData = useSelector(state => state.loggedInUserSlice.data);

  const handleCloseOffer = () => setShowOffer(false);
  const handleClosePostpone = () => setShowPostpone(false);
  const handleShowOffer = (flight) => {setSelectedFlight(flight);setShowOffer(true);};
  const handleShowPostpone = (flight) => { setSelectedFlight(flight); setShowPostpone(true);};
  const handleOfferChange = (event) => {setOffer(event.target.value); };
  const handleDepartureTimeChange = (event) => { setDepartureTime(event.target.value)};
  const handleArrivalTimeChange = (event) => { setArrivalTime(event.target.value) };

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
    else
    fetchData()
  },[userData, navigate]);

  function fetchData(){
    FlightsAPI({Authorization: `Token ${token}`})
        .then((result) => {
          setFlights(result.data)
        })
        .catch((error) => console.log(error));
  }
  

  function handleCancelClick(id){
    const confirmDelete = window.confirm("Are you sure you want to Cancel this flight?");
    if (!confirmDelete) {
      return;
    }
    axiosInstance
        .get(`flights/api/${id}`, {
          headers: {Authorization: `Token ${token}`}
        })
        .then((result) => {
          result.data.data.status = 'C'
          axiosInstance
            .put(`/flights/api/${id}`, result.data.data, {
              headers: {Authorization: `Token ${token}`}
            })  
            .then((response) => {
              fetchData()
            })
            .catch((error) => {
            console.error(error.response);
          })
        })
        .catch((error) => console.log(error));
  }
 
  function handleAddOffer(id){
    axiosInstance
        .get(`flights/api/${id}`, {
          headers: {Authorization: `Token ${token}`}
        })
        .then((result) => {
          result.data.data.offerPercentage = offer
          axiosInstance
            .put(`/flights/api/${id}`, result.data.data, {
              headers: {Authorization: `Token ${token}`}
            })  
            .then((response) => {
              fetchData()
            })
            .catch((error) => {
            console.error(error.response);
          })
        })
        .catch((error) => console.log(error));
        
  }
  const handlePostponeClick = (id) => {
    axiosInstance
    .get(`flights/api/${id}`, {
      headers: {Authorization: `Token ${token}`}
    })
    .then((result) => {
      result.data.data.departureTime = departureTime
      result.data.data.arrivalTime = arrivalTime
      axiosInstance
        .put(`/flights/api/${id}`, result.data.data, {
          headers: {Authorization: `Token ${token}`}
        })  
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
    .delete(`/flights/api/${flightId}`, {
      headers: {Authorization: `Token ${token}`}
    })  
    .then((response) => {
      fetchData()
    })
    .catch((error) => {
      console.error(error);
    });
  };

 return (
    <div className='container py-5 px-4'>
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
              
              <a className='btn btn-success m-2 w-50 text-white' onClick={() => {handleShowOffer(flight)}}>
              {flight.offerPercentage === 0 ?<span> Add Offer</span>:<span> Edit Offer</span>} </a>
              <a className='btn btn-warning m-2 w-25' onClick={() => {handleCancelClick(flight.id)}}>
               <FontAwesomeIcon icon={faBan} /></a>
              </div>
              <a className='btn m-2 w-50 text-white mx-auto' style={{backgroundColor: "var(--main-color)"}} 
              onClick={() => {handleShowPostpone(flight)}}>
                Postpone <FontAwesomeIcon icon={faPenToSquare} /></a>
              
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
      <Modal show={showPostpone} onHide={handleClosePostpone} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Postpone flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="input-group form-floating mx-auto w-75 mt-3">
          <span class="input-group-text" for="inputGroup4">Departure Time<pre>  </pre>  <FontAwesomeIcon icon={faClock} /></span>
          <input type="datetime-local" class="form-control" id="inputGroup4" required name='departureTime'
          onChange={handleDepartureTimeChange}/>
        </div>
        <div class="input-group form-floating mx-auto w-75 mt-3">
          <span class="input-group-text" for="inputGroup5">Arrival Time<pre>  </pre> <FontAwesomeIcon icon={faClock} /></span>
          <input type="datetime-local" class="form-control" id="inputGroup5" required name='arrivalTime'
          onChange={handleArrivalTimeChange}/>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={()=>{handlePostponeClick(selectedFlight.id);handleClosePostpone()}}>
            Postpone
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showOffer} onHide={handleCloseOffer} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="input-group mx-auto w-50 my-3">
          <span className="input-group-text" for="baseCost">
              <FontAwesomeIcon icon={faTag} /></span>
           <input type="number" class="form-control" required name='offerPercentage'
           onChange={handleOfferChange} placeholder={selectedFlight?.offerPercentage}/>
          <span className="input-group-text"><FontAwesomeIcon icon={faPercent} /></span>
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={()=>{handleAddOffer(selectedFlight.id);handleCloseOffer()}}>
            {selectedFlight.offerPercentage === 0 ?<span> Add Offer</span>:<span> Edit Offer</span>}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}