import {useEffect, useState, React} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosInstance } from "../APIs/Config";
import {faClock} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function PostponeForm() {
  const token = useSelector(state => state.Token.token);
  const navigate = useNavigate()
  const location = useLocation()
  const [flight,setFlight]=useState({aircraft:null,departureTime:null,arrivalTime:null,
  startAirport:null,endAirport:null,distance:0,avalableSeats:0,baseCost:null,status:'A'})

  useEffect(() => {
    axiosInstance
        .get(`flights/api/${location.state?.id}`, {
          headers: {Authorization: `Token ${token}`}
        })
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
    axiosInstance
        .put(`/flights/api/${location.state.id}`, flight, {
          headers: {Authorization: `Token ${token}`}
        })  
        .then((response) => {
          navigate(`/Flights`);
        })
        .catch((error) => {
          console.error(error.response);
        })
    }

  return (
    <div className='container p-5 '>
    <form onSubmit={onSubmit} className="border border-0 text-start shadow w-100">
    <div className='container p-5'>
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
      <div className='input-group mx-auto mt-4'>
        <button type="submit" className='btn mx-auto text-white border-0 ' style={{backgroundColor: "var(--main-color)"}}>
          <span>Postpone Flight</span>
        </button>
      </div>
      </div>
    </form>
    </div>
  );
}

export default PostponeForm;