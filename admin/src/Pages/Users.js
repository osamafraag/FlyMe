import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { AllUsers } from "./../APIs/AllUsers";
import { deleteUserAPI } from "./../APIs/DeleteUser";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { getAllUsersData } from '../Store/Slice/LoggedInUser';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons'

export default function Users() {
  const token = useSelector(state => state.Token.token);
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate();
  const [regularUsers, setRegularUsers] = useState([]);
  const [superUsers, setSuperUsers] = useState([]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false)
  const [userToDelete, setUserToDelete]= useState(0)
  const [numberOfUserDeleted, setNumberOfUserDeleted] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false)

  function handelNavagateToEdit(id) {
    navigate(`Edit/${id}`);
  }

  function handelDelateUser(){
    deleteUserAPI(token, userToDelete).then((res)=>{
      console.log(res)
      setNumberOfUserDeleted(numberOfUserDeleted+1)
      setShowModal(false)
      setErrorMessage(false)
    }).catch((err)=>{
      console.log(err)
      setErrorMessage("Something gone wrong!")
    })
  }

  function handelClickDeleteUser(id){
    setUserToDelete(id)
    setShowModal(true)
  }

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
        const allUsersData = result.data.data;
        dispatch(getAllUsersData(allUsersData))
        const regularUsers = allUsersData.filter(user => !user.is_superuser);
        const adminUsers = allUsersData.filter(user => user.is_superuser);
        setRegularUsers(regularUsers);
        setSuperUsers(adminUsers);
        setErrorMessage(false)
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Something gone wrong!")
      });
  }, [numberOfUserDeleted]);

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => {
        setErrorMessage(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage]);

  return (
    <div className='container pt-5 px-4'>
      {errorMessage && (
        <div className="error-message alert alert-danger mx-auto" style={{ fontSize: "15px", width:"700px" }}>
          {errorMessage}
        </div>
      )}
      {/* Super Users */}
        <div className='text-end'>
          <NavLink className="btn text-white" style={{backgroundColor: "var(--main-color)"}} to="/SuperUserForm" >
            <FontAwesomeIcon icon={faPlus} /> Add New User 
          </NavLink>
        </div>
      <div className='super-users pb-2'>
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
              <th>Edit</th>  
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
              <td>
              <button type="button" className="btn  border-0" style={{color: "var(--main-color)"}} onClick={()=>handelNavagateToEdit(user.id)} >
              <FontAwesomeIcon icon={faPenToSquare} />
              </button> 
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Regular Users */}
      <div className='regular-users'>
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
              <th>Edit</th>  
              <th>Delate</th>  
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
              <td>
              <button type="button" className="btn border-0"  style={{color: "var(--main-color)"}} onClick={()=>handelNavagateToEdit(user.id)} >
              <FontAwesomeIcon icon={faPenToSquare} />
              </button> 
              </td>
              <td>
              <button type="button" className="btn text-danger border-0" onClick={()=>handelClickDeleteUser(user.id)} >
              <FontAwesomeIcon icon={faTrash} className='text-danger' />
              </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} className='modal-lg modal-dialog-scrollable'>
        <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
            <Modal.Title>Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#fafafa" }}>
            <form>
                <p className="text text-danger">
                <strong>Warning:</strong> Be careful{'\n'}You are trying to delete user "as Admin".
                </p>
            </form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
        <Button className='border-0 btn btn-danger' onClick={() => handelDelateUser()}>
                Delate User
            </Button>
            <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() =>setShowModal(false)}>
                Back to Users
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}