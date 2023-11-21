import React, { useContext, useState, useEffect } from 'react';
import { SendPasswordResetCode } from '../../APIs/ForgetPassword';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { EmailAddress } from '../../Context/EmailAddress';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/Slice/LoggedInUser';
import { setToken } from '../../Store/Slice/Token';
import ForgetPasswordImage from '../../Assets/Images/Login/ForgetPassword.png'

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setEmailAddress } = useContext(EmailAddress)
  const navigate = useNavigate();

  // if user loged in .. it loges out
  const dispatch = useDispatch()
  dispatch(setToken(null))
  dispatch(logout())

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
    <Container className="py-5 fade-in">
      <Row className="row-cols-1 rounded-3 shadow mx-auto p-5" style={{width: "700px"}}>
        <Col>
          <img
            src={ForgetPasswordImage}
            width={200}
            className="img-fluid mb-4"
            alt="Login"
          />
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email Address"
              className="mb-3"
            >
              <Form.Control 
                type="email" 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </FloatingLabel>

            <div className='text-end'>
              <Button type="submit" className="btn text-white border-0 " style={{backgroundColor: "var(--main-color)"}} >
                Reset
              </Button>
            </div>

            <hr style={{color: "var(--main-color)"}} />

            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </Form>
          <div>
            <p className='text-end'>
              <a href="/account/create" className="text-decoration-none" style={{color: 'var(--main-color)'}}>
                Create Now Account!
              </a>
            </p>

            <p>
              <a href="/login" className="btn text-white" style={{backgroundColor: 'var(--main-color)'}}>
                Login
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPassword;
