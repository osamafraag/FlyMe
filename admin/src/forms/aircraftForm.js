import {useEffect, useState, React} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axiosInstance } from "../APIs/Config";
import {faWeightHanging, faPlane,faPersonWalkingLuggage,
        faPeopleGroup} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function AircraftForm() {
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const token = useSelector(state => state.Token.token);
  const navigate = useNavigate()
  const location = useLocation()
  const [aircraft,setAircraft]=useState({name:null,company:'A',capacity:null,maxLoad:0,baggageWeight:null,maxDistance:null})
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    if (location.state){
      axiosInstance
      .get(`flights/api/aircrafts/${location.state?.id}`, {
        headers: {Authorization: `Token ${token}`}
      })
      .then((result) => {
        setAircraft(result.data.data)
        setErrorMessage(false)
      })
      .catch((error) => {
        console.log(error)
        setErrorMessage("Something gone wrong!")
      });
    }
   
  },[])

  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
  }, [userData, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setAircraft({
      ...aircraft,
      [name]: value,
    });
  };
  
  const onSubmit = (event) => {
    event.preventDefault();
    location.state?
    axiosInstance
        .put(`/flights/api/aircrafts/${location.state.id}`, aircraft, {
          headers: {Authorization: `Token ${token}`}
        })  
        .then((response) => {
          navigate(`/Aircrafts`);
          setErrorMessage(false)
        })
        .catch((error) => {
          console.error(error.response.data.errors);
          setErrorMessage(error.response.data.errors)
        })
        :
    axiosInstance
        .post("flights/api/aircrafts/", aircraft, {
          headers: {Authorization: `Token ${token}`}
        })
        .then((response) => {
          navigate(`/Aircrafts`);
          setErrorMessage(false)
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          setErrorMessage(error.response.data.errors)
        });
    }

    console.log(errorMessage)

    useEffect(() => {
      if (errorMessage) {
        const timeout = setTimeout(() => {
          setErrorMessage(false);
        }, 10000);
  
        return () => clearTimeout(timeout);
      }
    }, [errorMessage]);
    
  return (
    <div className='container p-5'>
      {errorMessage && typeof errorMessage === 'string' && errorMessage.trim() !== '' && (
        <div className="error-message alert alert-danger mx-auto" style={{ fontSize: "15px", width:"700px" }}>
          {errorMessage}
        </div>
      )}
    <form onSubmit={onSubmit} className="border border-0 text-start shadow w-100">
    <div className='container p-5'>
      <div class="input-group ">
        <span class="input-group-text">Aircraft Name</span>
        <input type="text" class="form-control" required value={aircraft?.name} name='name'
        onChange={handleInputChange}/>
      </div>
      {errorMessage?.name && <p className='text-danger m-0'>{errorMessage.name}</p>}
      <div class="input-group mb-3 mt-5">
        <label class="input-group-text" for="inputGroupSelect02">Company Name</label>
        <select class="form-select" id="inputGroupSelect02" required value={aircraft?.company} name='company'
        onChange={handleInputChange}>
          <option value="A">Airbus</option>
          <option value="L">Lockheed Martin</option>
          <option value="R">Raytheon</option>
          <option value="B">Boeing</option>
        </select>
      </div>
      {errorMessage?.company && <p className='text-danger m-0'>{errorMessage.company}</p>}
      <div className='row justify-content-center align-items-center'>
        <div className='col my-4'>
          <div class="input-group me-auto w-75 mt-5">
            <input type="number" class="form-control" required value={aircraft?.capacity} name='capacity'
            onChange={handleInputChange} placeholder='Capacity'/>
            <span class="input-group-text"><FontAwesomeIcon icon={faPeopleGroup}/></span>
          </div>
          
          <div class="input-group me-auto w-75 mt-5">
            <input type="number" class="form-control"  value={aircraft?.maxLoad} name='maxLoad'
            onChange={handleInputChange} placeholder='Max Load'/>
            <span class="input-group-text">Ton</span>
            <span class="input-group-text"><FontAwesomeIcon icon={faWeightHanging}/></span>
          </div>
          {errorMessage?.maxLoad && <p className='text-danger m-0'>{errorMessage.maxLoad}</p>}
        </div>
        <div className='col my-4'>
          <div class="input-group ms-auto w-75 mt-5">
            <input type="number" class="form-control" required value={aircraft?.baggageWeight} name='baggageWeight'
            onChange={handleInputChange} placeholder='Baggage Weight'/>
            <span class="input-group-text">KG</span>
            <span class="input-group-text"><FontAwesomeIcon icon={faPersonWalkingLuggage}/></span>
          </div>
          {errorMessage?.baggageWeight && <p className='text-danger m-0'>{errorMessage.baggageWeight}</p>}
          <div class="input-group ms-auto w-75 mt-5">
            <input type="number" class="form-control" required value={aircraft?.maxDistance} name='maxDistance'
            onChange={handleInputChange} placeholder='Max Distance'/>
            <span class="input-group-text">KM</span>
            <span class="input-group-text"><FontAwesomeIcon icon={faPlane}/></span>
          </div>
          {errorMessage?.maxDistance && <p className='text-danger m-0'>{errorMessage.maxDistance}</p>}
        </div>
      </div>

      <button type="submit" className='btn ms-auto w-25 text-white' style={{backgroundColor: "var(--main-color)"}}>
        {location.state? <span>Edit Aircraft</span> :<span>Add Aircraft</span> } </button>
      </div>
    </form>
    </div>
  );
}

export default AircraftForm;