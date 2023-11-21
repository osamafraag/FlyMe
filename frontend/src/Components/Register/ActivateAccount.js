import React, { useContext, useEffect, useState } from 'react';
import { ActivateEmail, SendActivateEmail} from '../../APIs/Register';
import { EmailAddress } from '../../Context/EmailAddress';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/Slice/LoggedInUser';
import { setToken } from '../../Store/Slice/Token';
import ActivationImage from '../../Assets/Images/Login/Activation.jpg'

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
          }, 600);
          
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
    <div className="container my-5 fade-in ">
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
            <h5 className='text-start text-secondary'>Check Your Email</h5>
            <h6 className='mb-2 text-secondary '>{emailAddress}</h6>
            <div class="form-floating mb-3">
              <input 
                type="number" 
                class="form-control"
                id="code"
                name="code"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                />
                <label htmlFor="code">Verification Code</label>
            </div>
            {code && (
              <>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button type="submit" className="btn text-white" style={{backgroundColor: "var(--main-color)"}}>
                Activate Email
              </button>
            </div>
            
            </>
            )}
            {view && (
              <div className='fade-in'>
                <div className="d-flex justify-content-end align-items-center mt-4">
                  <button className="btn text-white" style={{backgroundColor: "var(--main-color)"}} onClick={handelSendActivationToEmail}>
                    Send Code Again
                  </button>
                </div>
              </div>
            )}
            <hr style={{color: "var(--main-color)"}} />

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
            <a href="/Register" className="text-decoration-none" style={{color: 'var(--main-color)'}}>
              Create Now Account!
            </a>
          </div>
          <div className="text-center mt-3">
            <a href="/Login" className="btn text-white" style={{backgroundColor: 'var(--main-color)'}}>
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateAcoontCheckCode;
