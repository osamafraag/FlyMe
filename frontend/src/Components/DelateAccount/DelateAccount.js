import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteUserAPI } from '../../APIs/DeleteUser';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Slice/LoggedInUser';
import { setToken } from '../../Store/Slice/Token';

export default function DeleteAccount() {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Ensure userData is not undefined or null before accessing its properties
  const userData = useSelector(state => state.loggedInUserSlice.data) || {};
  const token = useSelector(state => state.Token.token);

  // If !user navigate to this page
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
      return;
    }
  },[])
  // Return null if user data is not available
  if (!userData || Object.keys(userData).length === 0) {
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    deleteUserAPI(token, password, userData.id)
      .then((res) => {
        console.log(res.data);
        setSuccessMessage('Account deleted successfully.');
        setErrorMessage('');
        dispatch(setToken(null))
        dispatch(logout())
        setTimeout(() => {
          navigate("/")
        }, 2000);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error); // Update error message
        setSuccessMessage('');
        console.log(err);
      });
  };

  return (
    <Container className="py-5 fade-in">
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="mb-3">
              Delete Account
            </Button>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
