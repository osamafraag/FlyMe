import React , { useState, useEffect }from 'react'
import { GetCountries } from "./../APIs/Countries"
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Countries() {
  const token = useSelector(state => state.Token.token);
  const [countries, SetCountries] = useState([])
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate() 
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
    else
    GetCountries({Authorization: `Token ${token}`})
    .then((result) => {
      SetCountries(result.data)
      setErrorMessage(false)
    })
    .catch((error) => {
      console.log(error)
      setErrorMessage("Something gone wrong!")
    })
  }, [userData, navigate])

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  return (
    <div className='container py-5 px-4'>
      {errorMessage && (
        <div className="error-message alert alert-danger mx-auto" style={{ fontSize: "15px", width:"700px" }}>
          {errorMessage}
        </div>
      )}
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
            <td>{country.id}</td>
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