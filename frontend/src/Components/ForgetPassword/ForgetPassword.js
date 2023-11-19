import React, { useContext, useState } from 'react';
import { SendPasswordResetCode } from '../../APIs/ForgetPassword';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { EmailAddress } from '../../Context/EmailAddress';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {setEmailAddress} = useContext(EmailAddress)
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    SendPasswordResetCode(email)
      .then((res) => {
        setSuccessMessage('Verification code sent successfully, Please check your email.');
        setErrorMessage('');
        setEmailAddress(email)
        navigate('/ResetPassword');
        console.log(res.data);
      })
      .catch((err) => {
        setErrorMessage('This email is not registerd.');
        setSuccessMessage('');
        console.log(err);
      });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small/profile-icon-login-head-icon-vector.jpg"
            className="img-fluid mb-4"
            alt="Login"
          />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="mb-3">
              Reset
            </Button>

            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </Form>

          <div className="text-center">
            <p className="text-success">
              <a href="/login" className="text-decoration-none">
                Login?
              </a>
            </p>
            <p className="text-success">
              <a href="/account/create" className="text-decoration-none">
                Create Now Account!
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPassword;
