import React from 'react'
import { NavLink } from "react-router-dom";
import "./Sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPlaneDeparture,  
  faTicket,
  faUsers ,
  faPlaneCircleCheck,
  faGlobe,
  faCity,
  faRankingStar,
  faEnvelope,
  faCartFlatbedSuitcase,
  faPlane,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  return (
    <ul className="navbar-nav sidebar" >

      {/* Sidebar - Brand */}
      <NavLink className="d-flex align-items-center justify-content-center text-decoration-none text-white py-4" to="/">
        <h3 className="mx-3"><FontAwesomeIcon icon={faPlaneDeparture} /> Fly Me</h3>
      </NavLink>

      {/* Divider  */}
      <hr className="my-0 text-white" />

      {/* Nav Item - Bookings  */}
      <li className="nav-item active py-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/">
          <FontAwesomeIcon icon={faTicket} /> Bookings
        </NavLink>
      </li>

      {/* Nav Item - Users  */}
      <li className="nav-item active my-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Users">
          <FontAwesomeIcon icon={faUsers} /> Users
        </NavLink>
      </li>

      {/* Nav Item - Flights  */}
      <li className="nav-item active py-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Flights">
          <FontAwesomeIcon icon={faPlaneCircleCheck} /> Flights
        </NavLink>
      </li>

      {/* Nav Item - Classes  */}
      <li className="nav-item active my-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Classes">
          <FontAwesomeIcon icon={faLayerGroup} /> Classes
        </NavLink>
      </li>

      {/* Nav Item - Countries  */}
      <li className="nav-item active my-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Countries">
          <FontAwesomeIcon icon={faGlobe} /> Countries
        </NavLink>
      </li>

      {/* Nav Item - Cities  */}
      <li className="nav-item active my-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Cities">
          <FontAwesomeIcon icon={faCity} /> Cities
        </NavLink>
      </li>

      {/* Nav Item - Trending Places  */}
      <li className="nav-item active my-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/TrendingPlaces">
          <FontAwesomeIcon icon={faRankingStar} /> Trending Places
        </NavLink>
      </li>

      {/* Nav Item - Messages  */}
      <li className="nav-item active my-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Messages">
          <FontAwesomeIcon icon={faEnvelope} /> Messages
        </NavLink>
      </li>

      {/* Nav Item - Airports  */}
      <li className="nav-item active my-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Airports">
          <FontAwesomeIcon icon={faCartFlatbedSuitcase} /> Airports
        </NavLink>
      </li>

      {/* Nav Item - Aircrafts  */}
      <li className="nav-item active my-3 text-start ps-3">
        <NavLink className='me-3 fw-semibold text-white text-decoration-none' to="/Aircrafts">
          <FontAwesomeIcon icon={faPlane} /> Aircrafts
        </NavLink>
      </li>

    </ul>
  )
}