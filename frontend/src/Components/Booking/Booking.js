import React, { useEffect, useState } from 'react'
import "./Booking.css"
import SideBar from './SideBar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Step1 from './BookingSteps/Step1';
import Step2 from './BookingSteps/Step2';
import Step3 from './BookingSteps/Step3';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function BookingComponent() {
  const [insurance, setInsurance] = useState(0)
  const [TotalFare, setTotalFare] = useState(0)
  const [isDataSaved1, setIsDataSaved1] = useState(false)
  const [isDataSaved2, setIsDataSaved2] = useState(false)
  const [isDataSaved3, setIsDataSaved3] = useState(false)
  const [isAllDataSaved, setIsAllDataSaved] = useState(false)
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      navigate('/Login');
    }
    const handleIsDataSaved = () => {
      if (isDataSaved3 && isDataSaved2 && isDataSaved1) {
        console.log("All Data Saved")
        setIsAllDataSaved(true)
      }
      else if (isDataSaved1) {
        console.log('1')
      } else if (isDataSaved2) {
        console.log('2')
      } else if (isDataSaved3) {
        console.log('3')
      }
    }
    handleIsDataSaved()
  }, [userData, navigate, isDataSaved1, isDataSaved2, isDataSaved3]);

  // Return null if user data is not available
  if (!userData || Object.keys(userData).length === 0) {
    return null;
  }
  const handleInsuranceFareChange = (insuranceFare) => {
    console.log("Insurance Fare changed:", insuranceFare);
    setInsurance(insuranceFare)
  };
  const handleTotalFare = (Total_Fare) => {
    console.log("Total Fare changed:", Total_Fare);
    setTotalFare(Total_Fare)
  };

  const handleCloseModal = () => {
    navigate('/')
  }

  return (
    <div className='bookingPage w-100 text-start row'>
      <div className='col-8'>
        {/* Booking Steps: */}
        <Step1 TotalFare={TotalFare} setIsDataSaved1={setIsDataSaved1} />
        <Step2 onInsuranceFareChange={handleInsuranceFareChange} setIsDataSaved2={setIsDataSaved2} />
        <Step3 setIsDataSaved3={setIsDataSaved3} />

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
      <SideBar insurance={insurance} Total_Fare={handleTotalFare} />
    </div>
  )
}