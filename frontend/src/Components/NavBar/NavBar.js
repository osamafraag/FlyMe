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
import Profile from "./../../Assets/Images/Profile1.svg"


export default function NavBar() {
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
                  <NavLink onClick={handleLogout} className='me-3 fw-semibold text-dark text-decoration-none me-3'><FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout</NavLink>
                  <NavLink className='me-3 fw-semibold text-decoration-none' to="/Notifications me-3" style={{color: "var(--main-color)"}}><FontAwesomeIcon icon={faBell} /></NavLink>
                  <NavLink className='me-3 fw-semibold text-dark text-decoration-none ' to="/Profile">{userData.username} <img className="profile rounded-3" src={Profile} alt='' style={{width: "2rem"}} /></NavLink>
                </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}