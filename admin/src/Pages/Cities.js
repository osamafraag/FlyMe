import React , { useState, useEffect }from 'react'
import { GetCities, GetSpecificCity, EditCity } from "./../APIs/Cities"
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'

export default function Cities() {
  const [cities, SetCities] = useState([])
  const [specificCity, setSpecificCity] = useState()

  useEffect(() => {
    GetCities()
    .then((result) => {
      SetCities(result.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [specificCity])

  const handleFeautered = (id) => {
    GetSpecificCity(id)
      .then((result) => {
        const specificCityData = result.data[0];
        console.log(result) 
        if (specificCityData) {
          const updatedCity = { ...specificCityData, isFeatured: !specificCityData.isFeatured };
          setSpecificCity(updatedCity);
          
          try {
            const response = EditCity(id, JSON.stringify(updatedCity));
            console.log(updatedCity);
            console.log('Post Response:', response.data);
          } catch (error) {
            console.error('Error:', error);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary my-4'>Cities</h3>
      {/* <div className='text-end'>
        <NavLink className="btn text-white my-4" style={{backgroundColor: "var(--main-color)"}}to="/ClassForm" >
          <FontAwesomeIcon icon={faPlus} /> Add New City 
        </NavLink>
      </div> */}
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
            <td><a className='text-decoration-none' onClick={() => handleFeautered(city.id)}>{city.isFeatured ? <FontAwesomeIcon icon={faCheck} style={{color: "var(--main-color)"}} /> : <FontAwesomeIcon icon={faXmark} className='text-danger'/>}</a></td>  
            <td>{city.popularity}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}