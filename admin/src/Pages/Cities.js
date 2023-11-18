import React , { useState, useEffect }from 'react'
import { GetCities } from "./../APIs/Cities"
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Cities() {
  const [cities, SetCities] = useState([])
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate() 

  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
    else
    GetCities()
    .then((result) => {
      SetCities(result.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [userData, navigate])

  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary my-4'>Cities</h3>
      <div className='text-end'>
        <NavLink className="btn text-white my-4" style={{backgroundColor: "var(--main-color)"}}to="/ClassForm" >
          <FontAwesomeIcon icon={faPlus} /> Add New City 
        </NavLink>
      </div>
      <table className="table table-hover shadow-sm">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Slug</th>
          <th>Population</th>
          <th>Timezone</th>  
          <th>Featured</th>  
          <th>Popularity</th>  
        </tr>
      </thead>
      <tbody>
        {cities?.map((city, index) => (
          <tr key={index}>
            <td>{++index}</td>
            <td>{city.name}</td>
            <td>{city.slug}</td>
            <td>{city.population}</td>
            <td>{city.timezone}</td>
            <td>{city.isFeatured ? <FontAwesomeIcon icon={faCheck} style={{color: "var(--main-color)"}} /> : <FontAwesomeIcon icon={faXmark} className='text-danger'/>}</td>  
            <td>{city.popularity}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}