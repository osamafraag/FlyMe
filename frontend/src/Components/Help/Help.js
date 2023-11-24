import "./Help.css"
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneVolume, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useSelector } from 'react-redux';

export default function HelpComponent() {
  let userData = useSelector(state => state.loggedInUserSlice.data);
  console.log(userData)
  const token = useSelector(state => state.Token.token);
  let userId = userData ? userData.id : null
  console.log(userId)
  const [firstName, setFirstName] = useState(userData? userData.first_name : '');
  const [lastName, setLastName] = useState(userData? userData.last_name : '');
  const [email, setEmail] = useState(userData? userData.email : '');
  const [phoneNumber, setPhoneNumber] = useState(userData? userData.phone : '');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const API_BASE_URL = 'http://127.0.0.1:8000';

  const validateForm = () => {
    const errors = {};

    // Validate first name
    if (firstName.trim() === '') {
      errors.firstName = 'First name is required';
    }

    // Validate last name
    if (lastName.trim() === '') {
      errors.lastName = 'Last name is required';
    }

    // Validate email
    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    // Validate phone number
    // if (phoneNumber.trim() === '') {
    //   errors.phoneNumber = 'Phone number is required';
    // } else if (!isValidPhoneNumber(phoneNumber)) {
    //   errors.phoneNumber = 'Invalid phone number format';
    // }

    // Validate message
    if (message.trim() === '') {
      errors.message = 'Message is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // use a regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // use a regular expression to validate the phone number format
    const phoneNumberRegex = /^\d{11}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        description: message,
        status: "IN_PROGRESS",
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        email: email,
        user_id: userId
      }

      // Make a POST request to the API endpoint
      fetch(`${API_BASE_URL}/accounts/api/complaints/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to save data.');
          }
        })
        .then(data => {
          // Process the response data
          setSuccessMessage('Your Problem Sent Successfully, You Will Be Answered Quickly!');
          // Reset form fields
          !userData && setFirstName('');
          !userData && setLastName('');
          !userData && setEmail('');
          !userData && setPhoneNumber('');
          setMessage('');
        })
        .catch(error => {
          console.error(error);
          setSuccessMessage('An error occurred while saving the data.');
          console.log(formData)
        });


    };

  };
  return (
    <>
      <div className='headerr container-fluid py-5 mb-5'>
        <h1 className="textt" >How Can I help You ?</h1>
        <h4 >Achieve Results with FlyMe & Enjoy</h4>
      </div>
      <div className="container">
        <h1 className="text-start pt-5 textt"> Contact Us</h1>
        <h4 className="text-start pt-2 pb-3 ">Any question or remarks? Just write us a message!</h4>
        <div className="row">
          <div className="col col-5 text-light me-5 mt-5 border border-0 rounded-2 shadow my-5 px-5" style={{ backgroundColor: "var(--main-color)" }}>
            <h2 className="text-start pt-5"> Contact Information</h2>
            <p className="text-start pt-3 ">You can Contact With US Via </p>

            <div className="d-flex">
              <FontAwesomeIcon icon={faPhoneVolume} className='fs-5 icon text-start pt-5 me-2' />
              <h5 className="text-start pt-5 ps-2">+1012 3456 789</h5>
            </div>

            <div className="d-flex">
              <FontAwesomeIcon icon={faEnvelope} className='fs-5 icon text-start pt-4 me-2' />
              <h5 className="text-start pt-4 ps-2">flyme@gmail.com</h5>
            </div>

            <div className="d-flex">
              <FontAwesomeIcon icon={faLocationDot} className='fs-5 icon text-start pt-4 me-2' />
              <h5 className="text-start pt-4 ps-2 pb-5">15 Salah Salem, Cairo , Egypt</h5>
            </div>
          </div>

          <div className="col me-5  mb-5 px-5 rounded-2 shadow bg-light pb-0 mt-5">

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} className="text-start pb-0 pt-5 ">
              <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} className="form-group">
                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                  <label htmlFor="first-name">First Name</label>
                  <input
                    className={`border form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    type="text"
                    id="first-name"
                    name="first-name"
                    readOnly={userData}
                    // placeholder="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    className={`border form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    type="text"
                    id="last-name"
                    name="last-name"
                    readOnly={userData}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>
              </div>
              <div style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }} className="pt-3 form-group">
                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                  <label htmlFor="email">Email</label>
                  <input
                    className={`border form-control ${errors.email ? 'is-invalid' : ''}`}
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    className={`border form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    type="text"
                    id="phone"
                    name="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                </div>
              </div>
              <div style={{ marginBottom: '10px' }} className="pt-3 form-group">
                <label htmlFor="message" className="pe-2">Message</label>
                <textarea
                  className={`border form-control ${errors.message ? 'is-invalid' : ''}`}
                  id="message"
                  name="message"
                  rows="4"
                  cols="30"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                {errors.message && <div className="invalid-feedback">{errors.message}</div>}
              </div>
              <div className="text-end pb-3 pt-3">
                <button type="submit" className="btn text-light py-2 px-4" style={{ backgroundColor: "var(--main-color)" }}>Send Message</button>
              </div>
            </form>
            {successMessage && (
              <div className="alert alert-info" role="alert" style={{fontSize: "15px"}}>
                {successMessage}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}