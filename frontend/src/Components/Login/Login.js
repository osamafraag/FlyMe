import { React, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
import { Login } from '../../APIs/Login';
import { userData } from '../../APIs/AllUsers'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Store/Slice/LoggedInUser';
import { EmailAddress } from '../../Context/EmailAddress';
import { SendActivateEmail } from '../../APIs/Register';
import { setToken } from '../../Store/Slice/Token';
import { SetWallet } from '../../Store/Slice/Wallet';
import { AutoLogin } from '../../Context/AutoLogin';
import { userWallet } from '../../APIs/Wallet';

var loginImage = require('../../Assets/Images/Login/Login4.png')

export default function LoginForm() {
    const { userNameAndPassword, setUserNameAndPassword } = useContext(AutoLogin)
    const { setEmailAddress } = useContext(EmailAddress)
    let navigate = useNavigate()
    const dispatch = useDispatch();
    const [errorMessage, seterrorMessage] = useState(null)
    // Form State
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const [formError, setFormError] = useState({
        username: null,
        password: null,
    });

    function ifLoginSucess(res) {
        console.log(res.data.token)
        const token_data = res.data.token
        dispatch(setToken(res.data.token))
        // Sava User Data in the Reducer
        userData({
            Authorization: `Token ${token_data}`,
        })
            .then((result) => {
                dispatch(loginSuccess(result.data.user))
                setUserNameAndPassword(null)
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
        userWallet({ Authorization: `Token ${token_data}` })
            .then((result) => { dispatch(SetWallet((result.data.data))); console.log(result.data.data) })
            .catch((error) => { console.log(error) })
    }

    const handleOnChangeForm = (event) => {
        let name = event.target.name
        let value = event.target.value

        // Username Validations
        if (name === 'username') {
            setForm({
                ...form,
                username: value
            });
            setFormError({
                ...formError,
                username:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your username"
                        : null
            })
        }
        // Password Validations
        if (name === 'password') {
            setForm({
                ...form,
                password: value
            });
            setFormError({
                ...formError,
                password:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Password"
                        : null
            })
        }
    }


    const isFormValid = !formError.username && !formError.password && form.username && form.password

    // handle click on Login button
    const handleOnClickLogin = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Form Submitted Successfully");
            Login(form)
                .then((res) => {
                    ifLoginSucess(res)
                })
                .catch((err) => {
                    if (err.response && err.response.data.email) {
                        seterrorMessage('Email is not activated.');
                        const email = err.response.data.email
                        setEmailAddress(email)
                        SendActivateEmail({ email: email }).then((resu) => {
                            console.log(resu)
                            navigate("/CheckActivationCode")
                        }).catch((errors) => {
                            console.log(errors)
                        })
                    } else {
                        console.log(err.response.data);
                        seterrorMessage(err.response.data.error);
                    }
                });
        } else {
            seterrorMessage('Please Enter Your Username and Password.')
            console.log(formError);
            console.log(form);
        }
    };

    useEffect(() => {
        // for auto login
        if (userNameAndPassword) {
            Login(userNameAndPassword)
                .then((res) => {
                    ifLoginSucess(res)
                }).catch((err) => {
                    console.log(err);
                })
        }
    }, []);

    return (
        <div className='d-flex justify-content-center align-items-center' >
            <div className="profile container p-5 my-5  shadow rounded-3 bg-white text-start" style={{ width: "1000px" }}>
                <div className="row align-items-center">
                    <img
                        src={loginImage}
                        className="col-6"
                        width="300"
                    />
                    <div className="col-6 pb-5">
                        {(errorMessage) && (
                            <p className="text-danger" style={{ fontSize: '14px' }}>
                                {errorMessage}
                            </p>
                        )}
                        <form method="post" encType="multipart/form-data">
                            {/* Username */}
                            <div className=" mb-3">
                                <label htmlFor="floatingInput" className='form-label'>Username</label>
                                <input type="username" className="form-control" id="floatingInput" value={form.username} onChange={handleOnChangeForm} placeholder='Enter your username' name="username" required />
                                {formError.username && <div className="form-text text-danger text-start ">{formError.username}</div>}
                            </div>
                            {/* Password */}
                            <div className=" mb-3">
                                <label htmlFor="floatingPassword">Password</label>
                                <input type="password" className="form-control" id="floatingPassword" value={form.password} onChange={handleOnChangeForm} name='password' placeholder='Enter your password' required />
                                {formError.password && <div className="form-text text-danger text-start ">{formError.password}</div>}
                            </div>
                            {/* Forgot Password */}
                            <div className="d-flex flex-column">
                                <a href="" className="text-decoration-none text-end mt-3" style={{ color: '#426a9d' }} onClick={() => { navigate('/ForgetPassword') }} >Forgot Password?</a>
                                <button type="submit" className="btn custom-btn my-4 py-2" style={{ borderRadius: '7px' }} onClick={handleOnClickLogin}>Login</button>
                            </div>
                            <div>
                                <div className="d-flex justify-content-center ">
                                </div>
                            </div>
                        </form>
                        <hr />
                        <div className="text-center">
                            <a href="" className="text-decoration-none" style={{ color: 'var(--main-color)' }} onClick={() => navigate('/Register')}>Create New Account!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}