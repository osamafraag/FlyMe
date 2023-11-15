import "./Navbar.css"
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Profile from "./../../Assets/Images/Profile1.svg"

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="shadow-sm bg-white position-sticky top-0 start-0 py-3 px-5" style={{zIndex: "1000"}}>
      <Container>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto  align-items-center ">

            <NavLink className='fw-semibold text-secondary text-decoration-none' to="/Messages"><FontAwesomeIcon icon={faEnvelope} /><sup>(1)</sup></NavLink>

            <div class="topbar-divider d-none d-sm-block"></div>
            
            {/* User */}
            {/* User */}
            <div className="text-secondary">
              Sarah Mohamed
              <img className="profile rounded-3 ps-3" src={Profile} alt='' />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}