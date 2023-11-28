import { NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faPlaneDeparture, faBell } from '@fortawesome/free-solid-svg-icons'
import { logout, logData } from '../../Store/Slice/LoggedInUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Logout } from "../../APIs/Login";
import { GetMessages } from "../../APIs/Notification";
import { useEffect, useState } from "react";
import { setToken } from '../../Store/Slice/Token';
import { setNotifications, setUnread, setRead, setCounter } from "../../Store/Slice/Notifications";
import Woman from "./../../Assets/Images/Profile/Woman.jpg"
import Man from "./../../Assets/Images/Profile/Man.jpg"

export default function NavBar() {
  const token = useSelector(state => state.Token.token);
  const isUser = useSelector(state => state.loggedInUserSlice.data !== null);
  const counter = useSelector(state => state.Notifications.counter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userData = useSelector(state => state.loggedInUserSlice.data);
  const handleLogout = () => {

    Logout({
      Authorization: `Token ${token}`,
    }).then((res) => {
      console.log(res.data)
      dispatch(logout())
      dispatch(setToken(null))
      navigate('/');
    }).catch((error) => {
      console.log(error)
    });
  };

  useEffect(() => {
    if (isUser) {
      GetMessages(userData.id, { Authorization: `Token ${token}` })
        .then((result) => {
          console.log("Notifiction", result.data)
          dispatch(setNotifications(result.data))
          dispatch(setUnread(result.data?.filter(notification => notification.status === 'UNREAD')))
          dispatch(setRead(result.data?.filter((notification) => notification.status === 'READ' && !notification.deleted)))
        })
        .catch((error) => console.log(error))
    }
  }, [isUser, counter])

  return (
    <Navbar collapseOnSelect expand="lg" className="shadow-sm bg-white position-sticky top-0 start-0 py-3" style={{ zIndex: "1000" }}>
      <Container className="px-5">
        <NavLink className='text-uppercase fw-bold text-dark text-decoration-none me-5 fs-4' to="/"><FontAwesomeIcon icon={faPlaneDeparture} style={{ color: "var(--main-color)" }} /> Fly Me</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/Book">Book & Offers</NavLink>
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/AboutUs">About</NavLink>
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/Help">Help</NavLink>
          </Nav>
          <Nav>
            {
              !isUser
                ?
                <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/Login"><FontAwesomeIcon icon={faArrowRightToBracket} /> Login</NavLink>
                :
                <div className="d-flex align-items-center">
                  <NavLink className='fw-semibold text-dark text-decoration-none px-3' to="/Notifications">
                    <FontAwesomeIcon icon={faBell} className="fs-5" style={{ color: "var(--main-color)" }} /> {counter > 0 && <sup className="translate-middle badge bg-danger">
                      {counter}
                    </sup>}
                  </NavLink>
                  <div className="dropdown">
                    <button className="btn fw-semibold text-dark text-decoration-none" style={{border: 'none'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={userData?.image || (userData.gender == 'F' ? Woman : Man)} width="30" height="30" className="rounded-circle img-fluid mx-0 me-1" />
                      {userData.first_name} {userData.last_name}
                    </button>
                    <ul className="dropdown-menu">
                      <li className="d-flex align-items-center justify-content-center mb-2">
                        <NavLink className='fw-semibold text-dark text-decoration-none mx-0' to="/Profile">
                          <img src={userData?.image || (userData.gender == 'F' ? Woman : Man)} width="30" height="30" className="rounded-circle img-fluid mx-1" />
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={handleLogout} className='fw-semibold text-dark text-decoration-none mx-0 d-flex align-items-center justify-content-center'>
                          <FontAwesomeIcon icon={faArrowRightFromBracket} className="mx-1"/>
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>

                  {/* ------------- */}
                  {/* <NavLink className='me-3 fw-semibold text-dark text-decoration-none ' to="/Profile">
                    {userData.first_name} {userData.last_name}
                    <img src={userData?.image || (userData.gender == 'F' ? Woman : Man)} width="30" height="30" className="rounded-circle img-fluid mx-2" />

                  </NavLink>
                  <NavLink onClick={handleLogout} className='me-3 fw-semibold text-dark text-decoration-none'>Logout <FontAwesomeIcon icon={faArrowRightFromBracket} /></NavLink> */}
                </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}