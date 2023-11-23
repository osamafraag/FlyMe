import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChair, faMoneyCheckDollar, faPercent } from '@fortawesome/free-solid-svg-icons'

const CustomModal = ({ show, handleClose, handleCancelling, title }) => {
  return (
    <Modal show={show} onHide={handleClose} className='modal-lg modal-dialog-scrollable'>
      <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#fafafa" }}>
        <div className='border border-1 rounded-3 p-4 my-3 bg-white'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <p className='fw-bold m-0 p-0'>Are You Sure You Want To Unbook This Flight?</p>
              <p className='m-0 p-0'>If You Choose To Unbook, You will Lose <strong>10%</strong> of The Total Trip Cost.</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
        <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={handleClose}>
          Close
        </Button>
        <Button className='border-0 btn btn-danger' onClick={handleCancelling}>
          Unbook This Flight
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;