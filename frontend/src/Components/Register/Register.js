import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './register.css'
import { Register as RegisterAPI } from '../../APIs/Register'
import { getCountries } from '../../APIs/Countries';
import { AllUsers } from '../../APIs/AllUsers'

var RegisterImage = require('../../Assets/Images/Accounts/resgister.jpg')

export default function Register() {
    let navigate = useNavigate()
    const [errorMessage, seterrorMessage] = useState(null)
    const [usersArray, setusersArray] = useState()
    const [userEmailExist, setuserEmailExist] = useState(false)

    // Call All users for validations:
    useEffect(() => {
        const fetchUsers = async () => {
            const result = await AllUsers();
            setusersArray(result.data.data);
        };
        fetchUsers();
    }, []);

    // Call api countries
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getCountries();
                const countryNames = data.map(country => country.name);
                setCountries(countryNames);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);
    

    // Form State
    const [form, setForm] = useState({
        email: '',
        password: '',
        password2: '',
        username: '',
        phone: '',
        first_name: '',
        last_name: '',
        gender:'',
        male: '',
        female: '',
        birth_date: '',
        country: '',
        passport_number: '',
        passport_expire_date: '',
    })
    const [formError, setFormError] = useState({
        email: null,
        password: null,
        password2: null,
        username: null,
        phone: null,
        first_name: null,
        last_name: null,
        male: null,
        female: null,
        birth_date: null,
        country: null,
        passport_number: null,
        passport_expire_date: null,

    });

    // Regex Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; // Minimum eight characters, at least 1 letter and 1 number
    const weakPassword = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/
    const phoneRegex = /^01[0125][0-9]{8}$/;      // 010, 011, 012 or 015 + other 8 digits
    const passport_numberRegex = /(^A)[0-9]{8}$/;         // A + 8 numbers
    
    

    const handleOnChangeForm = (event) => {
        let name = event.target.name
        let value = event.target.value

        // Email Validations
        if (name === 'email') {
            setForm({
                ...form,
                email: value
            });
            const emailExists = usersArray ? usersArray.some(user => user.email === value) : false;
            setFormError({
                ...formError,
                email:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Email"
                        : !value.match(emailRegex)
                            ? "Invalid Email, Email Should Be Like This name@example.com"
                            : emailExists == true
                            ? "This email already exist"
                            : null
            })
        }
        // Password Validations
        else if (name === 'password') {
            setForm({
                ...form,
                password: value
            });
            setFormError({
                ...formError,
                password:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Password"
                        : !value.match(passwordRegex)
                            ? "Invalid Password, Password Should be Minimum eight characters, at least 1 letter and 1 number"
                            : !value.match(weakPassword)
                            ? "This password is too common."
                            : null
            })
        }
        // Confirm Password Validations
        else if (name === 'password2') {
            setForm({
                ...form,
                password2: value
            });
            setFormError({
                ...formError,
                password2:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Password"
                        : value !== form.password
                            ? "Password Don't Match"
                            : null
            })
        }
        // Username Validations
        else if (name === 'username') {
            setForm({
                ...form,
                username: value
            });
            const usernameExists = usersArray ? usersArray.some(user => user.username === value) : false;
            setFormError({
                ...formError,
                username:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Username"
                        : value.length < 3 || value.length > 20
                            ? "Invalid Name, Username can't Be Less Than 3 Nor Greater Than 20 Character."
                            : usernameExists == true
                            ? "This username already exist"
                                : null
            })
        }
        // Phone Number Validations
        else if (name === 'phone') {
            setForm({
                ...form,
                phone: value
            });
            setFormError({
                ...formError,
                phone:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Phone Number"
                        : !value.match(phoneRegex)
                            ? "Invalid Phone Number, Phone Number Should Start with 010, 011, 012 or 015 and othe 8 digits"
                            : null
            })
        }
        // Name Validations
        else if (name === 'first_name') {
            setForm({
                ...form,
                first_name: value
            });
            setFormError({
                ...formError,
                first_name:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your First Name"
                        : value.length < 3 || value.length > 20
                            ? "Invalid Name, First Name can't Be Less Than 3 Nor Greater Than 20 Character."
                            : null
            })
        }
        // Name Validations
        else if (name === 'last_name') {
            setForm({
                ...form,
                last_name: value
            });
            setFormError({
                ...formError,
                last_name:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Last Name"
                        : value.length < 3 || value.length > 20
                            ? "Invalid Name, Last Name can't Be Less Than 3 Nor Greater Than 20 Character."
                            : null
            })
        }
        // Gender
        else if (name === 'male' || name === 'female') {
            setForm({
                ...form,
                male: name === 'male',
                female: name === 'female',
                gender: name === 'male' ? 'M' : 'F'
            });
        }
        // Date of birth validations
        else if (name === 'birth_date') {
            const enteredDate = new Date(value);
            const today = new Date();
            setForm({
                ...form,
                birth_date: value
            });
            setFormError({
                ...formError,
                birth_date:
                    enteredDate > today
                        ? 'Date of Birth cannot be after today'
                        : null
            })
        }
        // Passport Number
        else if (name === 'passport_number') {
            setForm({
                ...form,
                passport_number: value
            });
            setFormError({
                ...formError,
                passport_number:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Passport Number"
                        : !value.match(passport_numberRegex)
                            ? "Invalid Passport Number, Egyption Passport Number start with {A} then 8 numbers"
                            : null
            })
        }
        // Expirty Date
        else if (name === 'passport_expire_date') {
            const enteredDate = new Date(value);
            const today = new Date();
            setForm({
                ...form,
                passport_expire_date: value
            });
            setFormError({
                ...formError,
                passport_expire_date:
                    enteredDate <= today
                        ? 'Expirty Date cannot be before today'
                        : null
            })
        }
    }

    // country
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        console.log('selectedValue', selectedValue)



        setSelectedCountry(selectedValue);
        setForm((prevForm) => ({
            ...prevForm,
            country: selectedValue
        }))
    };

    const isFormValid = !formError.email && !formError.password && !formError.password2 && !formError.phone && !formError.first_name && !formError.last_name && !formError.male && !formError.female && !formError.birth_date && !formError.country && !formError.passport_number && !formError.passport_expire_date && form.email && form.password && form.password2 && form.phone && form.first_name && form.last_name && (form.male || form.female) && form.birth_date && form.country && form.passport_number && form.passport_expire_date
    
    

    // handle click on Register button
    const handleOnClickRegister = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('form',form)
            console.log("Form Submitted Successfully");
            RegisterAPI(form)
                .then((res) => {
                    console.log('Register successful');
                    console.log('res.data',res.data);
                    navigate('/Login');
                })
                .catch((err) => {
                    console.log('Register failed');
                    console.log(err.response.data);
                    if (err.response.data.password) {
                        setFormError({
                            ...formError,
                            password: "This password is too common.",
                        });
                    } else {
                        seterrorMessage('An error occurred. Please try again.');
                    }
                });
        } else {
            console.log("Form Has Errors");
            seterrorMessage('Please enter all data.')
            console.log(formError);
            console.log(form);
        }
    };

    return (
        <div>
            <div className="profile container p-5 my-5 shadow-lg rounded-3 bg-white text-start">
                <div className="row align-items-center">
                    <img
                        src={RegisterImage}
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
                            {/* Email */}
                            <div className=" mb-3">
                                <label htmlFor="floatingInput" className='form-label'>Email address</label>
                                <input type="email" className="form-control" id="floatingInput" value={form.email} onChange={handleOnChangeForm} placeholder='Enter your email' name="email" required />
                                {formError.email && <div className="form-text text-danger text-start ">{formError.email}</div>}
                            </div>
                            {/* Username */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control" name='username' value={form.username} id="username" placeholder='Enter your Username' onChange={handleOnChangeForm} required />
                                {formError.username && <div className="form-text text-danger text-start ">{formError.username}</div>}
                            </div>
                            {/* Password */}
                            <div className=" mb-3">
                                <label htmlFor="floatingPassword">Password</label>
                                <input type="password" className="form-control" id="floatingPassword" value={form.password} onChange={handleOnChangeForm} name='password' placeholder='Enter your password' required />
                                {formError.password && <div className="form-text text-danger text-start ">{formError.password}</div>}
                            </div>
                            {/* Confirm Password */}
                            <div className=" mb-3">
                                <label htmlFor="password2">Confirm Password</label>
                                <input type="password" className="form-control" id="password2" value={form.password2} onChange={handleOnChangeForm} name='password2' placeholder='Enter your password' required />
                                {formError.password2 && <div className="form-text text-danger text-start ">{formError.password2}</div>}
                            </div>
                            {/* First Name */}
                            <div className="mb-3">
                                <label htmlFor="first_name" className="form-label">First Name</label>
                                <input type="text" className="form-control" name='first_name' value={form.first_name} id="first_name" placeholder='Enter your first name' onChange={handleOnChangeForm} required />
                                {formError.first_name && <div className="form-text text-danger text-start ">{formError.first_name}</div>}
                            </div>
                            {/* Last Name */}
                            <div className="mb-3">
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input type="text" className="form-control" name='last_name' value={form.last_name} id="last_name" placeholder='Enter your last name' onChange={handleOnChangeForm} required />
                                {formError.last_name && <div className="form-text text-danger text-start ">{formError.last_name}</div>}
                            </div>
                            {/* Gender */}
                            <div className="mb-3 d-flex">
                                <div className="mr-5">
                                    <input type="radio" checked={form.male} id="male" name="male" value={form.male} onChange={handleOnChangeForm} required />
                                    <label htmlFor="male" className="form-label px-2">Male</label>
                                </div>
                                <div>
                                    <input type="radio" checked={form.female} id="female" name="female" value={form.female} onChange={handleOnChangeForm} required />
                                    <label htmlFor="female" className="form-label px-2">Female</label>
                                </div>
                            </div>
                            {/* Phone Number */}
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <input type="number" className="form-control" name='phone' value={form.phone} id="phone" placeholder='Enter your phone number' onChange={handleOnChangeForm} required />
                                {formError.phone && <div className="form-text text-danger text-start ">{formError.phone}</div>}
                            </div>
                            {/* Date Of Birth */}
                            <div className="mb-3">
                                <label htmlFor="birth_date" className="form-label">Date Of Birth</label>
                                <input type="date" className="form-control" name='birth_date' value={form.birth_date} id="birth_date" onChange={handleOnChangeForm} required />
                                {formError.birth_date && <div className="form-text text-danger text-start ">{formError.birth_date}</div>}
                            </div>
                            {/* country */}
                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">country</label>
                                <select
                                    className="form-select"
                                    name="country"
                                    id="country"
                                    value={selectedCountry}
                                    onChange={handleSelectChange}
                                >
                                    <option value="" disabled>Select your country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                                {formError.country && <div className="form-text text-danger text-start ">{formError.country}</div>}
                            </div>
                            {/* Passport Number */}
                            <div className="mb-3">
                                <label htmlFor="passport_number" className="form-label">Passport Number</label>
                                <input type="text" className="form-control" name='passport_number' value={form.passport_number} id="passport_number" placeholder='Enter your Passport Number' onChange={handleOnChangeForm} required />
                                {formError.passport_number && <div className="form-text text-danger text-start ">{formError.passport_number}</div>}
                            </div>
                            {/* Passport Expirty Date */}
                            <div className="mb-3">
                                <label htmlFor="passport_expire_date" className="form-label">Passport Expirty Date</label>
                                <input type="date" className="form-control" name='passport_expire_date' value={form.passport_expire_date} id="passport_expire_date" onChange={handleOnChangeForm} required />
                                {formError.passport_expire_date && <div className="form-text text-danger text-start ">{formError.passport_expire_date}</div>}
                            </div>
                            <center><button type="submit" className="btn custom-btn my-4 py-2" style={{ borderRadius: '7px' }} onClick={handleOnClickRegister}>Register</button></center>
                            <div>
                                <div className="d-flex justify-content-center ">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}