import React, { useContext, useEffect, useState } from 'react';
import { CheckVerificationCode, ResetPasswordApi } from '../../APIs/ForgetPassword';
import { EmailAddress } from '../../Context/EmailAddress';
import './ResetPassword.css';

const ResetPassword = () => {
  const { emailAddress } = useContext(EmailAddress);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('Password reset failed. Please check your code.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small/profile-icon-login-head-icon-vector.jpg"
            className="img-fluid mb-4"
            alt="Login"
          />
        </div>
        <div className="col-lg-6 pb-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Verification Code
              </label>
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
            </div>

            {successMessage && (
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password
                </label>
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
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button type="submit" className="btn btn-success">
                Reset Password
              </button>
              <a href="/login" className="text-success">
                Login?
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

          <div className="text-center mt-3">
            <a href="/account/create" className="text-success">
              Create Now Account!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
