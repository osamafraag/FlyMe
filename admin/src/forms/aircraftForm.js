import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import {faWeightHanging, faPlane,faPersonWalkingLuggage,faPeopleGroup} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function LoginForm() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    var formData = new FormData();
        formData.append('json1', JSON.stringify(data));
        fetch('http://localhost:8000/flights/api/aircrafts/', { 
          method: 'POST', 
          mode: 'cors', 
          body: formData
        })
    navigate(`/Aircrafts`);
  };
  
  return (
    <div className='container p-5'>
    <form onSubmit={handleSubmit(onSubmit)} className="border border-0 text-start shadow w-100">
    <div className='container p-5'>
      <div class="input-group ">
        <span class="input-group-text">Aircraft Name</span>
        <input type="text" class="form-control" {...register("name", { required: true })}/>
      </div>
      {errors.name && <p className='text-danger'>Aircraft name is required</p>}

    
      <div class="input-group mb-3 mt-5">
        <label class="input-group-text" for="inputGroupSelect02">Company Name</label>
        <select class="form-select" id="inputGroupSelect02" {...register("company", { required: true })}>
          <option value="A" selected>Airbus</option>
          <option value="L">Lockheed Martin</option>
          <option value="R">Raytheon</option>
          <option value="B">Boeing</option>
        </select>
        {errors.company && <p className='text-danger'>Company name is required</p>}
      </div>
      <div className='row justify-content-center align-items-center'>
        <div className='col my-4'>
          <div class="input-group me-auto w-75 mt-5">
            <input type="number" class="form-control" {...register("capacity", { required: true })}/>
            <span class="input-group-text"><FontAwesomeIcon icon={faPeopleGroup}/></span>
          </div>
          {errors.capacity && <p className='text-danger'>Aircraft Capacity is required</p>}

          <div class="input-group me-auto w-75 mt-5">
            <input type="number" class="form-control" {...register("load", { required: true })}/>
            <span class="input-group-text">Ton</span>
            <span class="input-group-text"><FontAwesomeIcon icon={faWeightHanging}/></span>
          </div>
          {errors.load && <p className='text-danger'>Aircraft Max Load is required</p>}
        </div>
        <div className='col my-4'>
          <div class="input-group ms-auto w-75 mt-5">
            <input type="number" class="form-control" {...register("baggage", { required: true })}/>
            <span class="input-group-text">KG</span>
            <span class="input-group-text"><FontAwesomeIcon icon={faPersonWalkingLuggage}/></span>
          </div>
          {errors.baggage && <p className='text-danger ms-auto w-75'>Baggage weight is required</p>}

          <div class="input-group ms-auto w-75 mt-5">
            <input type="number" class="form-control" {...register("distance", { required: true })}/>
            <span class="input-group-text">KM</span>
            <span class="input-group-text"><FontAwesomeIcon icon={faPlane}/></span>
          </div>
          {errors.distance && <p className='text-danger ms-auto w-75'>Maximum Distance is required</p>}
        </div>
      </div>

      <button type="submit" className='btn btn-primary ms-auto w-25'>Add Aircraft</button>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;