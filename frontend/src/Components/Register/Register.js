import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'

var RegisterImage = require('../../Assets/Images/Accounts/resgister.jpg')

export default function Register() {
    let navigate = useNavigate()

    // Call api countries
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    useEffect(() => {
        fetch('https://osamafraag.pythonanywhere.com/countries/api/')
            .then(response => response.json())
            .then(data => {
                const countryNames = data.map(country => country.name);
                setCountries(countryNames);
            });
    }, []);

    // Form State
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        male: '',
        female: '',
        dateOfBirth: '',
        nationality: '',
        passportNumber: '',
        expirtyDate: '',
    })
    const [formError, setFormError] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        phoneNumber: null,
        firstName: null,
        lastName: null,
        male: null,
        female: null,
        dateOfBirth: null,
        nationality: null,
        passportNumber: null,
        expirtyDate: null,
    });

    // Regex Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/; // 4 Digits: At Least 1 Character / At Least 1 Number
    const phoneNumberRegex = /^01[0125][0-9]{8}$/;      // 010, 011, 012 or 015 + other 8 digits
    const passportNumberRegex = /(^A)[0-9]{8}$/;         // A + 8 numbers

    const handleOnChangeForm = (event) => {
        let name = event.target.name
        let value = event.target.value

        // Email Validations
        if (name === 'email') {
            setForm({
                ...form,
                email: value
            });
            setFormError({
                ...formError,
                email:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Email"
                        : !value.match(emailRegex)
                            ? "Invalid Email, Email Should Be Like This name@example.com"
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
                            ? "Invalid Password, Password Should Contains at least 4 Digits: At Least 1 Character / At Least 1 Number"
                            : null
            })
        }
        // Confirm Password Validations
        else if (name === 'confirmPassword') {
            setForm({
                ...form,
                confirmPassword: value
            });
            setFormError({
                ...formError,
                confirmPassword:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Password"
                        : value !== form.password
                            ? "Password Don't Match"
                            : null
            })
        }
        // Phone Number Validations
        else if (name === 'phoneNumber') {
            setForm({
                ...form,
                phoneNumber: value
            });
            setFormError({
                ...formError,
                phoneNumber:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Phone Number"
                        : !value.match(phoneNumberRegex)
                            ? "Invalid Phone Number, Phone Number Should Start with 010, 011, 012 or 015 and othe 8 digits"
                            : null
            })
        }
        // Name Validations
        else if (name === 'firstName') {
            setForm({
                ...form,
                firstName: value
            });
            setFormError({
                ...formError,
                firstName:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your First Name"
                        : value.length < 3 || value.length > 20
                            ? "Invalid Name, First Name can't Be Less Than 3 Nor Greater Than 20 Character."
                            : null
            })
        }
        // Name Validations
        else if (name === 'lastName') {
            setForm({
                ...form,
                lastName: value
            });
            setFormError({
                ...formError,
                lastName:
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
                female: name === 'female'
            });
        }
        // Date of birth validations
        else if (name === 'dateOfBirth') {
            const enteredDate = new Date(value);
            const today = new Date();
            setForm({
                ...form,
                dateOfBirth: value
            });
            setFormError({
                ...formError,
                dateOfBirth:
                    enteredDate > today
                        ? 'Date of Birth cannot be after today'
                        : null
            })
        }
        // Passport Number
        else if (name === 'passportNumber') {
            setForm({
                ...form,
                passportNumber: value
            });
            setFormError({
                ...formError,
                passportNumber:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Passport Number"
                        : !value.match(passportNumberRegex)
                            ? "Invalid Passport Number, Egyption Passport Number start with {A} then 8 numbers"
                            : null
            })
        }
        // Expirty Date
        else if (name === 'expirtyDate') {
            const enteredDate = new Date(value);
            const today = new Date();
            setForm({
                ...form,
                expirtyDate: value
            });
            setFormError({
                ...formError,
                expirtyDate:
                    enteredDate >= today
                        ? 'Expirty Date cannot be after today'
                        : null
            })
        }
    }

    // Nationality
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCountry(selectedValue);
    
        setForm((prevForm) => ({
            ...prevForm,
            nationality: selectedValue
        }))
    };

    const isFormValid = !formError.email && !formError.password && !formError.confirmPassword && !formError.phoneNumber && !formError.firstName && !formError.lastName && !formError.male && !formError.female && !formError.dateOfBirth && !formError.nationality && !formError.passportNumber && !formError.expirtyDate && form.email && form.password && form.confirmPassword && form.phoneNumber && form.firstName && form.lastName && (form.male || form.female) && form.dateOfBirth && form.nationality && form.passportNumber && form.expirtyDate

    // handle click on Register button
    const handleOnClickRegister = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Form Submitted Successfully");
            axios
                .post('https://osamafraag.pythonanywhere.com/accounts/api/register/', {
                    email: form.email,
                    password: form.password,
                })
                .then((res) => {
                    console.log('Register successful');
                    console.log(res.data);
                    navigate('/')
                    // handle the successful Register
                })
                .catch((err) => {
                    console.log('Register failed');
                    console.log(err.response.data);
                    // handle the failed Register
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
                        src={RegisterImage}
                        className="col-6"
                        width="300"
                    />
                    <div className="col-6 pb-5">
                        <form method="post" encType="multipart/form-data">
                            {/* Email */}
                            <div className=" mb-3">
                                <label htmlFor="floatingInput" className='form-label'>Email address</label>
                                <input type="email" className="form-control" id="floatingInput" value={form.email} onChange={handleOnChangeForm} placeholder='Enter your email' name="email" required />
                                {formError.email && <div className="form-text text-danger text-start ">{formError.email}</div>}
                            </div>
                            {/* Password */}
                            <div className=" mb-3">
                                <label htmlFor="floatingPassword">Password</label>
                                <input type="password" className="form-control" id="floatingPassword" value={form.password} onChange={handleOnChangeForm} name='password' placeholder='Enter your password' required />
                                {formError.password && <div className="form-text text-danger text-start ">{formError.password}</div>}
                            </div>
                            {/* Confirm Password */}
                            <div className=" mb-3">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" className="form-control" id="confirmPassword" value={form.confirmPassword} onChange={handleOnChangeForm} name='confirmPassword' placeholder='Enter your password' required />
                                {formError.confirmPassword && <div className="form-text text-danger text-start ">{formError.confirmPassword}</div>}
                            </div>
                             {/* Phone Number */}
                             <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                    <input type="number" className="form-control" name='phoneNumber' value={form.phoneNumber} id="phoneNumber" placeholder='Enter your phone number' onChange={handleOnChangeForm} required />
                                    {formError.phoneNumber && <div className="form-text text-danger text-start ">{formError.phoneNumber}</div>}
                                </div>
                                {/* First Name */}
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" name='firstName' value={form.firstName} id="firstName" placeholder='Enter your first name' onChange={handleOnChangeForm} required />
                                    {formError.firstName && <div className="form-text text-danger text-start ">{formError.firstName}</div>}
                                </div>
                                {/* Last Name */}
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" name='lastName' value={form.lastName} id="lastName" placeholder='Enter your last name' onChange={handleOnChangeForm} required />
                                    {formError.lastName && <div className="form-text text-danger text-start ">{formError.lastName}</div>}
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
                                {/* Date Of Birth */}
                                <div className="mb-3">
                                    <label htmlFor="dateOfBirth" className="form-label">Date Of Birth</label>
                                    <input type="date" className="form-control" name='dateOfBirth' value={form.dateOfBirth} id="dateOfBirth" onChange={handleOnChangeForm} required />
                                    {formError.dateOfBirth && <div className="form-text text-danger text-start ">{formError.dateOfBirth}</div>}
                                </div>
                                {/* Nationality */}
                                <div className="mb-3">
                                    <label htmlFor="nationality" className="form-label">Nationality</label>
                                    <select
                                        className="form-select"
                                        name="nationality"
                                        id="nationality"
                                        value={selectedCountry}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="" disabled>Select your nationality</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>{country}</option>
                                        ))}
                                    </select>
                                    {formError.nationality && <div className="form-text text-danger text-start ">{formError.nationality}</div>}
                                </div>              
                                {/* Passport Number */}
                                <div className="mb-3">
                                    <label htmlFor="passportNumber" className="form-label">Passport Number</label>
                                    <input type="text" className="form-control" name='passportNumber' value={form.passportNumber} id="passportNumber" placeholder='Enter your Passport Number' onChange={handleOnChangeForm} required />
                                    {formError.passportNumber && <div className="form-text text-danger text-start ">{formError.passportNumber}</div>}
                                </div>
                                {/* Passport Expirty Date */}
                                <div className="mb-3">
                                    <label htmlFor="expirtyDate" className="form-label">Passport Expirty Date</label>
                                    <input type="date" className="form-control" name='expirtyDate' value={form.expirtyDate} id="expirtyDate" onChange={handleOnChangeForm} required />
                                    {formError.expirtyDate && <div className="form-text text-danger text-start ">{formError.expirtyDate}</div>}
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