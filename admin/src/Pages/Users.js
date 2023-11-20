import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { AllUsers } from "./../APIs/AllUsers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

export default function Users() {
  const token = useSelector(state => state.Token.token);
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate();
  const [regularUsers, setRegularUsers] = useState([]);
  const [superUsers, setSuperUsers] = useState([]);

  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
  }, [userData, navigate]);

  useEffect(() => {
    AllUsers({Authorization: `Token ${token}`})
      .then((result) => {
        console.log(result.data.data);

        const regularUsers = result.data.data.filter(user => !user.is_superuser);
        const adminUsers = result.data.data.filter(user => user.is_superuser);

        setRegularUsers(regularUsers);
        setSuperUsers(adminUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='container py-5 px-4'>
      {/* Super Users */}
        <div className='text-end'>
          <NavLink className="btn text-white my-4" style={{backgroundColor: "var(--main-color)"}} to="/SuperUserForm" >
            <FontAwesomeIcon icon={faPlus} /> Add New User 
          </NavLink>
        </div>
      <div className='super-users pb-5'>
        <h3 className='text-start py-3' style={{color: "var(--main-color)"}}>Super Users</h3>
        <table className="table table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>E-mail</th> 
              <th>Gender</th>  
              <th>Birth Date</th> 
            </tr>
          </thead>
          <tbody>
          {superUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.gender == "F" ? "Female" : "Male"}</td>
              <td>{user.birth_date}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Regular Users */}
      <div className='regular-users pb-5'>
        <h3 className='text-start py-3' style={{color: "var(--main-color)"}}>Regular Users</h3>
        <table className="table table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>First</th>
              <th>Last</th>
              <th>Username</th>
              <th>E-mail</th>
              <th>Phone</th>  
              <th>Gender</th>  
              <th>B.O.D</th>  
              <th>P.Num</th>
              <th>P.E.D</th>  
            </tr>
          </thead>
          <tbody>
          {regularUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>  
              <td>{user.gender == "F" ? "Female" : "Male"}</td>  
              <td>{user.birth_date}</td>  
              <td>{user.passport_number}</td>
              <td>{user.passport_expire_date}</td>  
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}