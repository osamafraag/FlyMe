import { useEffect, useState, React } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosInstance } from "../APIs/Config";
import { AirportsAPI } from './../APIs/AirPorts'
import { AircraftsAPI } from './../APIs/Aircrafts'
import {
  faPlaneArrival, faPlane, faPlaneDeparture, faDollarSign, faClock,
  faTag, faPercent, faMoneyBills, faL
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function FlightForm() {
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const token = useSelector(state => state.Token.token);
  const navigate = useNavigate()
  const location = useLocation()
  const [airports, setAirports] = useState([])
  const [aircrafts, setAircrafts] = useState([])
  const [aircraft, setAircraft] = useState('')
  const [departureTime, setDepartureTime] = useState()
  const [arrivalTime, setArrivalTime] = useState()
  const [startAirport, setStartAirport] = useState('')
  const [endAirport, setEndAirport] = useState('')
  const [distance, setDistance] = useState()
  const [availableSeats, setAvailableSeats] = useState()
  const [baseCost, setBaseCost] = useState()
  const [status, setStatus] = useState()
  const [offerPercentage, setOfferPercentage] = useState()
  const [errorMessage, setErrorMessage] = useState(false)
  // const [flight,setFlight]=useState({aircraft:null,departureTime:null,arrivalTime:null,startAirport:null,
  //   endAirport:null,distance:0,avalableSeats:0,baseCost:null,status:'A',offerPercentage:null})

  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
  }, [userData, navigate]);

  useEffect(() => {
    AirportsAPI({ Authorization: `Token ${token}` })
      .then((result) => {
        setAirports(result.data)
        setErrorMessage(false)
        // setFlight({
        //   ...flight,
        //   startAirport: result.data[0].id,
        //   endAirport: result.data[1].id,
        // });
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage("Something gone wrong!")
      });
  }, []);

  useEffect(() => {
    AircraftsAPI({ Authorization: `Token ${token}` })
      .then((result) => {
        setAircrafts(result.data)
        setErrorMessage(false)
        // setFlight({
        //   ...flight,
        //   aircraft: result.data[0].id,
        // });
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage("Something gone wrong!")
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`flights/api/${location.state?.id}`, {
        headers: { Authorization: `Token ${token}` }
      })
      .then((result) => {
        // setFlight(result.data.data)
        setAircraft(result.data.data.aircraft)
        setDepartureTime(result.data.data.departureTime)
        setArrivalTime(result.data.data.arrivalTime)
        setDistance(result.data.data.distance)
        setAvailableSeats(result.data.data.availableSeats)
        setBaseCost(result.data.data.baseCost)
        setOfferPercentage(result.data.data.offerPercentage)
        setStatus(result.data.data.status)
        setStartAirport(result.data.data.startAirport)
        setEndAirport(result.data.data.endAirport)
        setErrorMessage(false)
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage("Something gone wrong!")
      });
  }, [])

  const onSubmit = (event) => {
    event.preventDefault();
    const flight = {
      departureTime: departureTime,
      arrivalTime: arrivalTime,
      distance: distance,
      availableSeats: availableSeats,
      baseCost: baseCost,
      offerPercentage: offerPercentage,
      status: status,
      aircraft: aircraft,
      startAirport: startAirport,
      endAirport: endAirport,
    }
    location.state ?
      axiosInstance
        .put(`/flights/api/${location.state.id}`, flight, {
          headers: { Authorization: `Token ${token}` }
        })
        .then((response) => {
          navigate(`/Flights`);
          setErrorMessage(false)
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Something gone wrong, May Be There Problem In Date , Base Cost < 500 or You Don't Enter Required Input")
        })
      :
      console.log('flight', flight)
    axiosInstance
      .post("flights/api/all/", flight, {
        headers: { Authorization: `Token ${token}` }
      })
      .then((response) => {
        navigate(`/Flights`);
        setErrorMessage(false)
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Something gone wrong, May Be There Problem In Date , Base Cost < 500 or You Don't Enter Required Input")
      });
  }

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);
  
  return (
    <div className='container p-5 '>
      {errorMessage && (
        <div className="error-message alert alert-danger mx-auto" style={{ fontSize: "15px", width:"700px" }}>
          {errorMessage}
        </div>
      )}
      <form onSubmit={onSubmit} className="border border-0 text-start shadow w-100">
        <div className='container p-5'>
          <div className="input-group mx-auto w-75">
            <span className="input-group-text" for="inputGroupSelect01">Aircraft<pre>  </pre>  <FontAwesomeIcon icon={faPlane} /> </span>
            <select className="form-select" id="inputGroupSelect01" required value={aircraft || ''} name='aircraft' onChange={(e) => setAircraft(e.target.value)}>
              <option value="" disabled>Select Aircraft</option>
              {aircrafts?.map((aircraft, index) => {
                return (<option key={index} value={aircraft.id}>{aircraft.name}</option>);
              })}
            </select>
          </div>

          <div className="input-group mx-auto w-75 mt-3">
            <span className="input-group-text" for="inputGroupSelect02">Start Airport <pre>  </pre> <FontAwesomeIcon icon={faPlaneDeparture} /> </span>
            <select className="form-select" id="inputGroupSelect02" required value={startAirport} name='startAirport'
              onChange={(e) => setStartAirport(e.target.value)}>
              <option value="" disabled>Select Start Airport</option>
              {airports?.map((airport, index) => {
                return (<option value={airport.id}>{airport.name}</option>)
              })}
            </select>
          </div>

          <div className="input-group mx-auto w-75 mt-3">
            <span className="input-group-text" for="inputGroupSelect03">Destination Airport <pre>  </pre> <FontAwesomeIcon icon={faPlaneArrival} /> </span>
            <select className="form-select" id="inputGroupSelect01" required value={endAirport} name='endAirport' onChange={(e) => setEndAirport(e.target.value)}>
              <option value="" disabled>Select End Airport</option>
              {airports?.map((airport, index) => {
                return (<option value={airport.id}>{airport.name}</option>)
              })}
            </select>
          </div>

          <div className="input-group form-floating mx-auto w-75 mt-3">
            <span className="input-group-text" for="inputGroup4">Departure Time<pre>  </pre>  <FontAwesomeIcon icon={faClock} /></span>
            <input type="datetime-local" className="form-control" id="inputGroup4" required name='departureTime'
              onChange={(e) => setDepartureTime(e.target.value)} />
          </div>
          <div class="input-group form-floating mx-auto w-75 mt-3">
            <span class="input-group-text" for="inputGroup5">Arrival Time<pre>  </pre> <FontAwesomeIcon icon={faClock} /></span>
            <input type="datetime-local" className="form-control" id="inputGroup5" required name='arrivalTime'
              onChange={(e) => setArrivalTime(e.target.value)} />
          </div>
          <div class="input-group mx-auto w-75 my-3">
            <span class="input-group-text" for="baseCost">Basic Cost<pre>  </pre> <FontAwesomeIcon icon={faMoneyBills} /></span>
            <input type="number" class="form-control" required value={baseCost} name='baseCost'
              onChange={(e) => setBaseCost(e.target.value)} />
            <span class="input-group-text"><FontAwesomeIcon icon={faDollarSign} /></span>
          </div>
          <div className="input-group mx-auto w-75 my-3">
            <span className="input-group-text" for="baseCost">Discount percentage<pre>  </pre><FontAwesomeIcon icon={faTag} /></span>
            <input type="number" class="form-control" required value={offerPercentage} name='offerPercentage'
              onChange={(e) => setOfferPercentage(e.target.value)} />
            <span className="input-group-text"><FontAwesomeIcon icon={faPercent} /></span>
          </div>
          <div className='input-group mx-auto'>
            <button type="submit" className='btn mx-auto text-white border-0 ' style={{ backgroundColor: "var(--main-color)" }}>
              {location.state ? <span>Edit Flight</span> : <span>Add Flight</span>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FlightForm;