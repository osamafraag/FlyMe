import React, { useEffect, useState } from 'react'
import "./Booking.css"
import SideBar from './SideBar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Step1 from './BookingSteps/Step1';
import Step2 from './BookingSteps/Step2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BookingComponent() {
  const [TotalFare, setTotalFare] = useState(0)
  const [isAllDataSaved, setIsAllDataSaved] = useState(false)
  const [className, setClassName] = useState('-');
  const [classAdditionalCostPercentage, setClassAdditionalCostPercentage] = useState(0);
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      navigate('/Login');
    }
    const handleIsDataSaved = () => {
      if (isAllDataSaved) {
        console.log("All Data Saved")
        setIsAllDataSaved(true)
      }
    }
    handleIsDataSaved()
  }, [userData, navigate]);

  // Return null if user data is not available
  if (!userData || Object.keys(userData).length === 0) {
    return null;
  }
  const handleTotalFare = (TotalFare) => {
    console.log("Total Fare changed:", TotalFare);
    setTotalFare(TotalFare)
  };

  const handleCloseModal = () => {
    navigate('/')
  }

  return (
    <div className='bookingPage w-100 text-start row' >
      <div className='col-8'>
        {/* Booking Steps: */}
        <Step1 />
        <br />
        <Step2 setIsAllDataSaved={setIsAllDataSaved} TotalFare={TotalFare} setClassName={setClassName} setClassAdditionalCostPercentage={setClassAdditionalCostPercentage} />
        {/* <Step3 /> */}

        {/* Confirmation Window/Message */}
          <Modal show={isAllDataSaved} onHide={handleCloseModal} className='modal-lg modal-dialog-scrollable'>
            <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
              <Modal.Title>Congrats!</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#fafafa" }}>
              <div className='border border-1 rounded-3 p-4 my-3 bg-white' >
                <p className='fw-bold'>Your booking is confirmed!</p>
              </div>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
              <Button className='border-0' style={{ backgroundColor: "var(--main-color)"}} onClick={handleCloseModal}>
                Back To Home
              </Button>
            </Modal.Footer>
          </Modal>
      </div>
      {/* Side Bar */}
      <SideBar TotalFare={handleTotalFare} classAdditionalCostPercentage={classAdditionalCostPercentage} className={className} />
    </div>
  )
}