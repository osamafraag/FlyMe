import React, { useContext, useEffect, useState } from 'react';
import { ActivateEmail, SendActivateEmail} from '../../APIs/Register';
import { EmailAddress } from '../../Context/EmailAddress';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/Slice/LoggedInUser';
import { setToken } from '../../Store/Slice/Token';

const ActivateAcoontCheckCode = () => {
  const { emailAddress } = useContext(EmailAddress);
  const [code, setCode] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()
  const[view,setView] = useState(false)

  // if user loged in .. it loges out
  const dispatch = useDispatch()
  dispatch(setToken(null))
  dispatch(logout())
  
  const timeoutView = (delay)=>{
    setTimeout(() => {
      setView(true);
    }, delay);
  } 

  useEffect(() => {
    timeoutView(5000)
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

  // const obfuscateEmail = (email) => {
  //   const atIndex = email.indexOf('@');
  //   const obfuscatedUsername = email.substring(0, Math.min(2, atIndex)) + '****';
  //   return obfuscatedUsername + email.substring(atIndex);
  // };
  const handelSendActivationToEmail = (e)=>{
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage("Sending activation code ...");
    SendActivateEmail({email:emailAddress}).then((res)=>{
      console.log(res)
      setSuccessMessage('Verification code sent, cheack mailbox!');
      setErrorMessage(null);
    }).catch((err)=>{
      console.log(err)
      setErrorMessage('failed to send. try again in 10 sec');
      setSuccessMessage(null);
    })
    setView(false);
    timeoutView(10000)
  }

  return (
    <div className="container my-5 fade-in">
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
                type="number"
                className="form-control"
                id="code"
                name="code"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            {code && (
              <>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button type="submit" className="btn btn-success">
                Activate Email
              </button>
            </div>
            
            </>
            )}
            {view && (
              <div className='fade-in'>
                <hr className="text-success" />
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <button className="btn btn-primary" onClick={handelSendActivationToEmail}>
                    Send Activation Code Again
                  </button>
                </div>
              </div>
            )}
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
            <a href="/Register" className="text-primary">
              Create Now Account
            </a>
          </div>
          <div className="text-center mt-3">
            <a href="/Login" className="text-success">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateAcoontCheckCode;
