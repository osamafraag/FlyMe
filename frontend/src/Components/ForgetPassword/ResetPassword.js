import React, { useContext, useEffect, useState } from 'react';
import { CheckVerificationCode, ResetPasswordApi } from '../../APIs/ForgetPassword';
import { EmailAddress } from '../../Context/EmailAddress';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/Slice/LoggedInUser';
import { setToken } from '../../Store/Slice/Token';
import ActivationImage from '../../Assets/Images/Login/Activation.jpg'

const ResetPassword = () => {
  const { emailAddress } = useContext(EmailAddress);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  // if user loged in .. it loges out
  const dispatch = useDispatch()
  dispatch(setToken(null))
  dispatch(logout())

  useEffect(() => {
    if (code) {
      CheckVerificationCode(emailAddress, code)
        .then((res) => {
          console.log(res.data);
          setSuccessMessage('Verification successful!');
          setErrorMessage('');
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage('Verification failed. Please check your code.');
          setSuccessMessage('');
        });
    }
  }, [code, emailAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    ResetPasswordApi(emailAddress, code, password)
      .then((res) => {
        console.log(res.data);
        setSuccessMessage('Password reset successful!');
        setErrorMessage('');
        navigate("/login")
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('Password reset failed. Please check your code.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="container my-5 fade-in">
      <div className="row row-cols-1 align-items-center px-5  rounded-3 shadow mx-auto" style={{width: "700px"}}>
        <div>
          <img
            src={ActivationImage}
            width={200}
            className="img-fluid mb-4"
            alt="Login"
          />
        </div>
        <div className="pb-5">
          <form onSubmit={handleSubmit}>
          <div class="form-floating mb-3">
            <input 
              type="text"
              className="form-control"
              id="code"
              name="code"
              placeholder="Verification Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <label htmlFor="code">Verification Code</label>
          </div>

            {successMessage && (
            <div class="form-floating mb-3">
              <input 
                type="password"
                className={`form-control ${successMessage ? 'fade-in' : ''}`}
                id="password"
                name="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="code">New Password</label>
            </div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button type="submit"className="btn text-white" style={{backgroundColor: "var(--main-color)"}}>
                Reset Password
              </button>
              <a href="/login" className="btn text-white" style={{backgroundColor: 'var(--main-color)'}}>
                Login
              </a>
            </div>
            <hr className="text-success" />

            {successMessage && (
              <div className="alert alert-success mt-3" role="alert">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}

          </form>

          <div className="text-end mt-3">
            <a href="/account/create" className="text-decoration-none" style={{color: 'var(--main-color)'}}>
              Create Now Account!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
