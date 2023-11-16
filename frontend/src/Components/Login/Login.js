import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'

var loginImage = require('../../Assets/Images/Accounts/login.jpg')

export default function LoginForm() {
    let navigate = useNavigate()
    // Form State
    const [form, setForm] = useState({
        username: '',
        password: '',

    })
    const [formError, setFormError] = useState({
        username: null,
        password: null,
    });

    const handleOnChangeForm = (event) => {
        let name = event.target.name
        let value = event.target.value

        // username Validations
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
            axios
            .post('https://osamafraag.pythonanywhere.com/accounts/api/login/', {
                username: form.username,
                password: form.password,
            })
            .then((res) => {
                console.log('Login successful');
                console.log(res.data);
                navigate('/')
                // handle the successful login
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
                                <label htmlFor="floatingInput" className='form-label'>Username</label>
                                <input type="username" className="form-control" id="floatingInput" value={form.username} onChange={handleOnChangeForm} placeholder='Enter your username' name="username" required/>
                                {formError.username && <div className="form-text text-danger text-start ">{formError.username}</div>}
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