import "./Help.css"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope ,faPhoneVolume,faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

export default function HelpComponent() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
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
            <div className="col col-5 bg-dark text-light me-5 mt-5 border border-0 rounded-2 shadow my-5 px-5">
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
            
            <div className="col me-5  mb-5 px-5 rounded-2 shadow bg-light pb-0" style={{marginTop:'80px'}}>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} className="text-start pb-0 pt-5 ">
                <div style={{ display: 'flex', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                    <label htmlFor="first-name">First Name</label>
                    <input
                      className="border"
                      type="text"
                      id="first-name"
                      name="first-name"
                      // placeholder="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      className="border"
                      type="text"
                      id="last-name"
                      name="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', marginBottom: '10px' }} className="pt-3">
                  <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}>
                    <label htmlFor="email">Email</label>
                    <input
                      className="border"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      className="border"
                      type="text"
                      id="phone"
                      name="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', marginBottom: '10px' }} className="pt-3">
                  <label htmlFor="message" className="pe-2">Message</label>
                  <textarea
                    className="border"
                    id="message"
                    name="message"
                    rows="4"
                    cols="30"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="text-end pb-3">
                  <button type="submit" className="btn bg-dark text-light py-2 px-4">Send Message</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </>
    )
}