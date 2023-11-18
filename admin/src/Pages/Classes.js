import React , { useState, useEffect }from 'react'
import { GetClasses, DeleteClass } from "./../APIs/Classes"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faCheck, faXmark} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Classes() {
  const [classes, setClasses] = useState([])
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate() 

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
    else
    GetClasses()
    .then((result) => {
      console.log(result.data);
      setClasses(result.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [userData, navigate])

  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary my-4'>Classes</h3>
      <div className='text-end'>
        <NavLink className="btn text-white my-4" style={{backgroundColor: "var(--main-color)"}}to="/ClassForm" >
          <FontAwesomeIcon icon={faPlus} /> Add New Class
        </NavLink>
      </div>
      <table className="table table-hover shadow-sm">
      <thead className="table-light">
        <tr>
          <th>#</th>
          <th>AirCraft Name</th>
          <th>Additional Cost Percentage</th>
          <th>Seat Category</th>
          <th>Meal Category</th>
          <th>Drink Category</th>
          <th>WIFI Availability</th>
          <th>Power Outlet</th>
          <th>Stream Entertainment</th>  
          <th>Edit</th>  
          <th>Delete</th>  
        </tr>
      </thead>
      <tbody>
        {classes?.map((classData, index) => (
          <tr key={index}>
            <td>{++index}</td>
            <td>{classData.name}</td>
            <td>{classData.additionalCostPercentage}%</td>
            <td>{classData.seatCategory}</td>
            <td>{classData.mealCategory}</td>
            <td>{classData.drinkCategory}</td>
            <td>{classData.wifiAvailability ? <FontAwesomeIcon icon={faCheck} style={{color: "var(--main-color)"}} /> : <FontAwesomeIcon icon={faXmark} className='text-danger'/>}</td>
            <td>{classData.powerOutlet ? <FontAwesomeIcon icon={faCheck} style={{color: "var(--main-color)"}} /> : <FontAwesomeIcon icon={faXmark} className='text-danger'/>}</td>
            <td>{classData.streamEntertainment ? <FontAwesomeIcon icon={faCheck} style={{color: "var(--main-color)"}} /> : <FontAwesomeIcon icon={faXmark} className='text-danger'/>}</td> 
            <td><a className="text-decoration-none" style={{color: "var(--main-color)"}}><FontAwesomeIcon icon={faPenToSquare} onClick={() => {handleEditClick(classData.id)}} /></a></td> 
            <td><a className="text-decoration-none text-danger" onClick={() => handleDeleteClick(classData.id, classData.name)}><FontAwesomeIcon icon={faTrash}/></a></td> 
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}