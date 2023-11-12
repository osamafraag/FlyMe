import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faPlaneDeparture, faGauge } from '@fortawesome/free-solid-svg-icons'

export default function NavBar({isAdmin}) {
  return (
    <Navbar collapseOnSelect expand="lg" className="shadow-sm bg-white position-sticky top-0 start-0 py-3" style={{zIndex: "1000"}}>
      <Container>
        <NavLink className='text-uppercase fw-bold text-dark text-decoration-none me-5 fs-4' to="/"><FontAwesomeIcon icon={faPlaneDeparture} style={{color: "var(--main-color)"}} /> Fly Me</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/Book">Book</NavLink>
            <NavLink  className='me-3 fw-semibold text-dark text-decoration-none' to="/TermsAndConditions">Terms And Conditions</NavLink>
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/AboutUs">About</NavLink>
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/Help">Help</NavLink>
          </Nav>
          <Nav>
            <NavLink className='me-3 fw-semibold text-dark text-decoration-none' to="/Login"><FontAwesomeIcon icon={faArrowRightToBracket} /> Login</NavLink>
            <NavDropdown title="En" id="collapsible-nav-dropdown" className='fw-semibold language'>
              <NavDropdown.Item href="#action/3.1" className='fw-semibold'>En</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className='fw-semibold'>Ar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}