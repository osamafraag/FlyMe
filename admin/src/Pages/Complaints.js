import React, { useState, useEffect } from 'react';
import { GetComplaints } from './../APIs/Complaints';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './complaints.css'
import { axiosInstance } from "../APIs/Config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faReply ,faPencil,faTrash} from '@fortawesome/free-solid-svg-icons';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (complaint) => {
    setSelectedComplaint(complaint);
    setShow(true);
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
        .get(`accounts/api/complaints/${id}`)
        .then((result) => {
            console.log(result.data.data)
            putData(result.data.data)
          })
        .catch((error) => console.log(error));
    handleCloseReply()
  };
  function putData(data) {
    data.answer = reply
    axiosInstance
        .put(`/accounts/api/complaints/${data.id}`, data)  
        .then((response) => {
          fetchData()
        })
        .catch((error) => {
        console.error(error.response);
      })
  }
  
  useEffect(() => {
    fetchData()
  }, []);
  
  function fetchData() {
    GetComplaints()
      .then((result) => {
        setComplaints(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this Complaint?");
    if (!confirmDelete) {
      return;
    }

    axiosInstance
    .delete(`accounts/api/complaints/${id}`)  
    .then((response) => {
      fetchData()
    })
    .catch((error) => {
      console.error(error);
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

  return (
    <div className='container p-5'>
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
              <td><Button
                  className='btn'
                  style={{ backgroundColor: 'transparent', border: 'none' }}
                  onClick={() => handleShowReply(complaint)}
                >
                  <FontAwesomeIcon icon={faReply} style={{ color: 'var(--main-color)' }} />
                </Button></td>
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
            <td><a className='btn btn-danger' onClick={()=>{handleDelete(complaint.id)}}><FontAwesomeIcon icon={faTrash} /></a></td>
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
            replay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}