import React, { useState, useEffect } from 'react';
import { GetComplaints } from './../APIs/Complaints';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (complaint) => {
    setSelectedComplaint(complaint);
    setShow(true);
  };

  useEffect(() => {
    GetComplaints()
      .then((result) => {
        console.log(result.data);
        setComplaints(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {complaints?.map((complaint, index) => (
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
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Complaints</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedComplaint?.description}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}