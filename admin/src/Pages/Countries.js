import React , { useState, useEffect }from 'react'
import { GetCountries } from "./../APIs/Countries"
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'

export default function Countries() {
  const [countries, SetCountries] = useState([])

  useEffect(() => {
    GetCountries()
    .then((result) => {
      SetCountries(result.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary my-4'>Countries</h3>
      {/* <div className='text-end'>
        <NavLink className="btn text-white my-4" style={{backgroundColor: "var(--main-color)"}}to="/" >
          <FontAwesomeIcon icon={faPlus} /> Add New Country 
        </NavLink>
      </div> */}
      <table className="table table-hover shadow-sm">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>ASCII Name</th>
          <th>Slug</th>
          <th>Code2</th>
          <th>Code3</th>
          <th>Continent</th>
          <th>TLD</th>  
          <th>Phone</th>  
          <th>Featured</th>  
          <th>Popularity</th>  
        </tr>
      </thead>
      <tbody>
        {countries?.map((country, index) => (
          <tr key={index}>
            <td>{++index}</td>
            <td>{country.name}</td>
            <td>{country.name_ascii}</td>
            <td>{country.slug}</td>
            <td>{country.code2}</td>
            <td>{country.code3}</td>
            <td>{country.continent}</td>
            <td>{country.tld}</td>
            <td>{country.phone}</td>
            <td>{country.isFeatured ? <FontAwesomeIcon icon={faCheck} style={{color: "var(--main-color)"}} /> : <FontAwesomeIcon icon={faXmark} className='text-danger'/>}</td>  
            <td>{country.popularity}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}