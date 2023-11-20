import "./Navbar.css"
import { NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Profile from "./../../Assets/Images/Profile1.svg"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout, logData } from '../../Store/Slice/LoggedInUser';
import { setToken } from '../../Store/Slice/Token';
import { faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  const isUser = useSelector(state => state.loggedInUserSlice.data !== null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userData = useSelector(state => state.loggedInUserSlice.data);
  const handleLogout = () => {
    dispatch(logout())
    dispatch(setToken(null))
    navigate('/Login');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="shadow-sm bg-white position-sticky top-0 start-0 py-3 px-5" style={{ zIndex: "1000" }}>
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto  align-items-center ">
            {/* User */}
            {
              !isUser
                ?
                <div className="text-secondary">
                  NO USER
                </div>
                :
                <div className="text-secondary">
                  {userData.username}
                  <img className="profile rounded-3 ps-3" src={Profile} alt='' />
                  <NavLink onClick={handleLogout} className='ms-3 fw-semibold text-dark text-decoration-none'><FontAwesomeIcon icon={faArrowRightFromBracket}/> Logout</NavLink>
                </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}