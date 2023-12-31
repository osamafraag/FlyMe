import React, { useState, useEffect } from 'react';
import { GetComplaints } from './../APIs/Complaints';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './CSS/Style.css'
import { axiosInstance } from "../APIs/Config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faReply ,faPencil,faTrash} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Complaints() {
  const token = useSelector(state => state.Token.token);
  const [complaints, setComplaints] = useState([]);
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate() 
  const [errorMessage, setErrorMessage] = useState(false)

  const handleClose = () => setShow(false);

  const handleShow = (complaint) => {
    setSelectedComplaint(complaint);
    setShow(true);
    complaint.status = complaint.status == "IN_PROGRESS" ? "OPEN" :  complaint.status == "OPEN" && "REOPENED"
    axiosInstance
        .put(`/accounts/api/complaints/${complaint.id}`, complaint, {
          headers: {Authorization: `Token ${token}`}
        })   
        .then((response) => {
          console.log(response)
          fetchData()
          setErrorMessage(false)
        })
        .catch((error) => {
        console.error(error.response);
        setErrorMessage("Something gone wrong!")
      })
  };
  const handleCloseReply = () => setShowReply(false);

  const handleShowReply = (complaint) => {
    setSelectedComplaint(complaint);
    setShowReply(true);
  };

  const handleInputChange = (event) => {
    setReply(event.target.value);
  };

  const handleSubmit = (id) => {
    axiosInstance
        .get(`accounts/api/complaints/${id}`, {
          headers: {Authorization: `Token ${token}`}
        })  
        .then((result) => {
            console.log(result.data.data)
            putData(result.data.data)
            setErrorMessage(false)
          })
        .catch((error) => {
          console.log(error)
          setErrorMessage("Something gone wrong!")
        });
    handleCloseReply()
  };
  function putData(data) {
    console.log(reply.trim() == '')
    if (reply.trim() === '') {
      setErrorMessage("Sorry, But You can't Send Empty Message!")
      return
    } else {
      data.answer = reply
      data.status = "RESOLVED"
      axiosInstance
          .put(`/accounts/api/complaints/${data.id}`, data, {
            headers: {Authorization: `Token ${token}`}
          })   
          .then((response) => {
            console.log(response)
            fetchData()
            setErrorMessage(false)
          })
          .catch((error) => {
          console.error(error.response);
          setErrorMessage("Something gone wrong!")
        })
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [userData, navigate]);
  
  function fetchData() {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
    else
    GetComplaints({Authorization: `Token ${token}`})
      .then((result) => {
        console.log(result.data)
        setComplaints(result.data);
        setErrorMessage(false)
      })
      .catch((error) => {
        console.log(token)
        console.log(error);
        setErrorMessage("Something gone wrong!")
      });
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this Complaint?");
    if (!confirmDelete) {
      return;
    }

    axiosInstance
    .delete(`accounts/api/complaints/${id}`, {
      headers: {Authorization: `Token ${token}`}
    })  
    .then((response) => {
      fetchData()
      setErrorMessage(false)
    })
    .catch((error) => {
      console.error(error);
      setErrorMessage("Something gone wrong!")
    });
  };

  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    const formattedDate = new Date(dateString).toLocaleString('en-US', options);

    return formattedDate;
  }

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
      <h3 className='text-start text-secondary my-4'>Complaints</h3>
      <table className='table table-hover shadow-sm'>
        <thead className='table-light'>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>E-mail</th>
            <th>Show Complaints</th>
            <th>Arrived At</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {complaints?.map((complaint, index) => (
            complaint.answer === ''?
            <tr key={index}>
              <td>{++index}</td>
              <td>{complaint.first_name}</td>
              <td>{complaint.last_name}</td>
              <td>{complaint.phone}</td>
              <td>{complaint.email}</td>
              <td>
                <Button
                  className='btn'
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                  onClick={() => handleShow(complaint)}
                >
                  <FontAwesomeIcon icon={faEye} style={{ color: 'var(--main-color)' }} />
                </Button>
              </td>
              <td>{formatDate(complaint.created_at)}</td>
              {complaint.user_id ?
              <td><Button
                className='btn'
                style={{ backgroundColor: 'transparent', border: 'none' }}
                onClick={() => handleShowReply(complaint)}
              >
                <FontAwesomeIcon icon={faReply} style={{ color: 'var(--main-color)' }} />
              </Button></td>
              :
              <td><a className='btn border-0'>-</a></td>
              }
            </tr>
            :
            <tr key={index}>
            <td>{++index}</td>
            <td>{complaint.first_name}</td>
            <td>{complaint.last_name}</td>
            <td>{complaint.phone}</td>
            <td>{complaint.email}</td>
            <td>
              <Button
                className='btn'
                style={{ backgroundColor: 'transparent', border: 'none' }}
                onClick={() => handleShow(complaint)}
              >
                <FontAwesomeIcon icon={faEye} style={{ color: 'var(--main-color)' }} />
              </Button>
            </td>
            <td>{formatDate(complaint.created_at)}</td>
            {complaint.user_id ?
              <td><a className='btn border-0' onClick={()=>{handleDelete(complaint.id)}}><FontAwesomeIcon icon={faTrash} className='text-danger' /></a></td>
              :
              <td><a className='btn border-0'>-</a></td>
            }
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Complaints</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedComplaint?.description}
          </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showReply} onHide={handleCloseReply} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Complaints</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedComplaint?.description}
          <div class="md-form amber-textarea active-amber-textarea">
            <FontAwesomeIcon className='prefix' style={{ color: 'var(--main-color)' }} icon={faPencil} />
            <textarea id="form22" className="md-textarea form-control" rows="3" onChange={handleInputChange}></textarea>
            <label htmlFor="form22"  style={{ color: 'var(--main-color)' }}>Write your reply</label>
          </div>
          </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={()=>{handleSubmit(selectedComplaint.id)}}>
            Replay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}