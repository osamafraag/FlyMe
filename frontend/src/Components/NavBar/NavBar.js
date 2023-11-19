import { NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faPlaneDeparture, faBell } from '@fortawesome/free-solid-svg-icons'
import { logout, logData } from '../../Store/Slice/LoggedInUser';
import { useDispatch  } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useNotificationContext } from './../Notifications/NotificationContext';


export default function NavBar() {
  const { unreadCount } = useNotificationContext();
  const isUser = useSelector(state => state.loggedInUserSlice.data !== null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userData = useSelector(state => state.loggedInUserSlice.data);
  const handleLogout = () => {
    dispatch(logout())
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="shadow-sm bg-white position-sticky top-0 start-0 py-3" style={{ zIndex: "1000" }}>
      <Container className="px-5">
        <NavLink className='text-uppercase fw-bold text-dark text-decoration-none me-5 fs-4' to="/"><FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "var(--main-color)" }} /> Fly Me</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/Book">Book</NavLink>
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/AboutUs">About</NavLink>
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/Help">Help</NavLink>
          </Nav>
          <Nav>
            {
              !isUser
                ?
                <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/Login"><FontAwesomeIcon icon={faArrowRightToBracket} /> Login</NavLink>
                :
                <div>
                  <NavLink onClick={handleLogout} className='me-3 fw-semibold text-dark text-decoration-none'><FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout</NavLink>
                  <NavLink className='me-3 fw-semibold text-dark text-decoration-none px-3' to="/Notifications"><FontAwesomeIcon icon={faBell} /> {unreadCount > 0 &&  <span class="position-absolute top-3 start-60 translate-middle badge rounded-pill bg-danger">
                     {unreadCount}
                    <span class="visually-hidden">unread messages</span>
                  </span>}</NavLink>
                  <NavLink className='me-3 fw-semibold text-dark text-decoration-none ' to="/Profile">{userData.username}</NavLink>
                </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}