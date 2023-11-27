import React from 'react'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
      <footer style={{backgroundColor: "var(--main-color)"}} className="text-center text-lg-start text-white">
        <section className="py-2">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">

              <div className="col-lg-3 col-md-6 mx-auto mb-4">
                <h6 className="text-uppercase fs-4 mb-3" style={{fontWeight: "700"}}>
                  <FontAwesomeIcon icon={faPlaneDeparture} /> Fly Me
                </h6>
                <p>
                Traveling is not just about reaching a destination; it's about embracing new experiences, expanding your horizons, and finding inspiration in the unknown.
                </p>
              </div>

              <div className="col-lg-3 col-md-6 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact Info</h6>
                <p>
                  <FontAwesomeIcon icon={faLocationDot} /> 28 Km by Cairo / Mansoura Road, 6 October, B148, Egypt
                </p>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} /> Fly-Me@iti.com
                </p>
                <p><FontAwesomeIcon icon={faPhoneVolume} /> 17002</p>
              </div>

              <div className="col-lg-3 col-md-6 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Extra Links</h6>
                <p>
                  <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Book">Book</NavLink>
                </p>
                <p>
                  <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/AboutUs">About</NavLink>
                </p>
                <p>
                  <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Help">Help</NavLink>
                </p>
                <p>
                  <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/TermsAndConditions">Terms and Conditions</NavLink>
                </p>
              </div>

            </div>

          </div>
        </section>
        <div className="text-center p-4" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
          Copyright &copy; 2023 All rights reserved
        </div>
      </footer>
    )
}