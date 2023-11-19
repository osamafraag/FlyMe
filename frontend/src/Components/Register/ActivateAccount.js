import React, { useContext, useEffect, useState } from 'react';
import { ActivateEmail } from '../../APIs/Register';
import { EmailAddress } from '../../Context/EmailAddress';
import { useNavigate } from 'react-router-dom';

const ActivateAcoontCheckCode = () => {
  const { emailAddress } = useContext(EmailAddress);
  const [code, setCode] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (code) {
        ActivateEmail(emailAddress, code)
        .then((res) => {
          console.log(res.data);
          setSuccessMessage('Verification successful!');
          setErrorMessage(null);
          const myTimeout = setTimeout(() => {
            navigate("/login")
          }, 2000);
          
        })
        .catch((err) => {
          console.log(err);
          console.log(emailAddress, code)
          setErrorMessage('Verification failed. Please check your code.');
          setSuccessMessage(null);
        });
    }
  }, [code]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('Wrong Code');
    setSuccessMessage(null);
  };

  const obfuscateEmail = (email) => {
    const atIndex = email.indexOf('@');
    const obfuscatedUsername = email.substring(0, Math.min(2, atIndex)) + '****';
    return obfuscatedUsername + email.substring(atIndex);
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
            <h4>we have send activation code to your email: </h4>
            <h5>{emailAddress}</h5>
            <br/>
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

            <div className="d-flex justify-content-between align-items-center mt-4">
            {code && (
              <button type="submit" className="btn btn-success">
                Activate Email
              </button>
            )}
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

export default ActivateAcoontCheckCode;
