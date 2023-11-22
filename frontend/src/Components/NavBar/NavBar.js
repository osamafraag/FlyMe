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
import { Logout } from "../../APIs/Login";
import { GetMessages } from "../../APIs/Notification";
import { useEffect, useState } from "react";
import { setToken } from '../../Store/Slice/Token';
import { setNotifications, setUnread, setRead, setCounter } from "../../Store/Slice/Notifications";

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
    }).then((res)=>{
      console.log(res.data)
      dispatch(logout())
      dispatch(setToken(null))
      navigate('/');
    }).catch((error)=>{
      console.log(error)
    });
  };
  
  useEffect(() => {
    if (isUser) {
      GetMessages(userData.id, { Authorization: `Token ${token}`})
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
                <div>
                  <NavLink className='fw-semibold text-dark text-decoration-none px-3' to="/Notifications">
                    <FontAwesomeIcon icon={faBell} className="fs-5" style={{color: "var(--main-color)"}}/> {counter > 0 &&  <sup class="translate-middle badge bg-danger">
                     {counter}
                  </sup>}
                  </NavLink>
                  <NavLink className='me-3 fw-semibold text-dark text-decoration-none ' to="/Profile">{userData.username}</NavLink>
                  <NavLink onClick={handleLogout} className='me-3 fw-semibold text-dark text-decoration-none'>Logout <FontAwesomeIcon icon={faArrowRightFromBracket}/></NavLink>
                </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}