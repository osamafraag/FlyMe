import React , { useState, useEffect }from 'react'
import { GetClasses, DeleteClass } from "./../APIs/Classes"
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus, faCheck, faXmark, faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Classes() {
  const token = useSelector(state => state.Token.token);
  const [classes, setClasses] = useState([])
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate() 
  const [deleteClass, setDeleteClass] = useState()

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
    else
    GetClasses({Authorization: `Token ${token}`})
    .then((result) => {
      console.log(result.data);
      setClasses(result.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [userData, navigate, deleteClass])

  function handleEditClick(id){ navigate(`/ClassForm`,{state:{id:id}})}

  function handleDeleteClick(id, name) {
    const confirmDelete = window.confirm(`Are You Sure You Want To Delete ${name} Class ?`);
    if (!confirmDelete) {
      return;
    }

    DeleteClass(id, {Authorization: `Token ${token}`})  
    .then((response) => {
      setDeleteClass(`${name} Class Deleted Successfully`)
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className='container py-5 px-4'>
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
            <td><a className='btn border-0 ' style={{color: "var(--main-color)"}} onClick={() => {handleEditClick(classData.id)}}><FontAwesomeIcon icon={faPenToSquare} /></a></td>
            <td><a className='btn text-dangr border-0 ' onClick={() => {handleDeleteClick(classData.id, classData.name)}}><FontAwesomeIcon icon={faTrash} className='text-danger' /></a></td>  
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}