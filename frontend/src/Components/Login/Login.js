import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'
import { Login } from '../../APIs/Login';
import { useContext } from "react";
import { Token } from "../../Context/Token";


var loginImage = require('../../Assets/Images/Accounts/login.jpg')

export default function LoginForm() {

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;

    const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
    });

    const [currentUser, setCurrentUser] = useState();
    const [registrationToggle, setRegistrationToggle] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    let navigate = useNavigate()
    // Form State
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [formError, setFormError] = useState({
        email: null,
        password: null,
    });

    const handleOnChangeForm = (event) => {
        let name = event.target.name
        let value = event.target.value

        // Username Validations
        if (name === 'email') {
            setForm({
                ...form,
                email: value
            });
            setFormError({
                ...formError,
                email:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your email"
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

    const isFormValid = !formError.email && !formError.password && form.email && form.password

    let {setToken} = useContext(Token)
    // handle click on Login button
    const handleOnClickLogin = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Form Submitted Successfully");
            Login(form)
                .then((res) => {
                    console.log('Login successful');
                    console.log(res.data);
                    setToken(res.data.token)
                    navigate('/');
                })
                .catch((err) => {
                    console.log('Login failed');
                    console.log(err.response.data);
                    // handle the failed login
                });
        } else {
            console.log("Form Has Errors");
            console.log(formError);
            console.log(form);
        }
    };
    useEffect(() => {
        client.get("accounts/api/user/tst")
        .then(function(res) {
            console.log(res)
          setCurrentUser(true);
        })
        .catch(function(error) {
            console.log(error)
          setCurrentUser(false);
        });
      }, []);

    return (
        <div>
            <div className="profile container p-5 my-5 shadow-lg rounded-3 bg-white text-start">
                <div className="row align-items-center">
                    <img
                        src={loginImage}
                        className="col-6"
                        width="300"
                    />
                    <div className="col-6 pb-5">
                        <form method="post" encType="multipart/form-data">
                            {/* Username */}
                            <div className=" mb-3">
                                <label htmlFor="floatingInput" className='form-label'>Email</label>
                                <input type="username" className="form-control" id="floatingInput" value={form.email} onChange={handleOnChangeForm} placeholder='Enter your email' name="email" required/>
                                {formError.username && <div className="form-text text-danger text-start ">{formError.email}</div>}
                            </div>
                            {/* Password */}
                            <div className=" mb-3">
                                <label htmlFor="floatingPassword">Password</label>
                                <input type="password" className="form-control" id="floatingPassword" value={form.password} onChange={handleOnChangeForm} name='password' placeholder='Enter your password' required/>
                                {formError.password && <div className="form-text text-danger text-start ">{formError.password}</div>}
                            </div>
                            {/* Forgot Password */}
                            <div className="d-flex flex-column">
                                <a href="" className="text-decoration-none text-end mt-3" style={{color: '#426a9d'}}>Forgot Password?</a>
                                <button type="submit" className="btn custom-btn my-4 py-2" style={{borderRadius: '7px'}} onClick={handleOnClickLogin}>Login</button>
                            </div>
                            <div>
                                <div className="d-flex justify-content-center ">
                                </div>
                            </div>
                        </form>
                        <hr />
                        <div className="text-center">
                            <a href="" className="text-decoration-none" style={{color: '#426a9d'}} onClick={()=>navigate('/Register')}>Create New Account!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}