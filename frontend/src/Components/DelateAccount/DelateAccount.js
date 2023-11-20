import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteUserAPI } from '../../APIs/DeleteUser'; 
import { useSelector } from 'react-redux';

export default function DeleteAccount() {
  const [password, setPassword] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  // Ensure userData is not undefined or null before accessing its properties
  const userData = useSelector(state => state.loggedInUserSlice.data) || {};
  console.log(userData.id);

  const token = useSelector(state => state.Token.token);
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    deleteUserAPI(token, password, userData.id) 
      .then((res) => {
        console.log(res.data);
        setSuccessMessage('Account deleted successfully.');
        setErrorMessage('');
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
