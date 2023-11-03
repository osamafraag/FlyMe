import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className='text-uppercase fw-bold me-5 fs-5' ><FontAwesomeIcon icon={faPlaneDeparture} /> Fly Me</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#book" className='me-3 fw-semibold '>Book</Nav.Link>
            <Nav.Link href="#explore" className='me-3 fw-semibold '>Explore</Nav.Link>
            <Nav.Link href="#about" className='me-3 fw-semibold '>About</Nav.Link>
            <Nav.Link href="#help" className='me-3 fw-semibold '>Help</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#login" className='fw-semibold'><FontAwesomeIcon icon={faArrowRightToBracket} /> Login</Nav.Link>
            <NavDropdown title="En" id="collapsible-nav-dropdown" className='fw-semibold'>
              <NavDropdown.Item href="#action/3.1" className='fw-semibold'>En</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className='fw-semibold'>Ar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}