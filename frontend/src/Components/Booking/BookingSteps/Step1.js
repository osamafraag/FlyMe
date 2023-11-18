import React, { useState, useEffect } from 'react'
import Header from './Header'
import Step2 from './Step2';
import { useSelector } from 'react-redux';

export default function Step1() {
    let userData = useSelector(state => state.loggedInUserSlice.data);
    console.log(userData)
    // handle click on the header to show or not the content of the step
    const [isContentVisible, setIsContentVisible] = useState(false);
    const handleToggle = () => {
        setIsContentVisible(!isContentVisible)
    }

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
    const phoneNumberRegex = /^01[0125][0-9]{8}$/;      // 010, 011, 012 or 015 + other 8 digits
    const passportNumberRegex = /(^A)[0-9]{8}$/;         // A + 8 numbers

    // handle form on change
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

   const isFormValid = !formError.email && !formError.phoneNumber && !formError.firstName && !formError.lastName && !formError.male && !formError.female && !formError.dateOfBirth && !formError.nationality && !formError.passportNumber && !formError.expirtyDate && form.email && form.phoneNumber && form.firstName && form.lastName && (form.male || form.female) && form.dateOfBirth && form.nationality && form.passportNumber && form.expirtyDate

    // handle click on save and submit button
    const [dataSaved, setDataSaved] = useState(false);
    const handleOnClickSaveButton = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Form Submitted Successfully");
            setDataSaved=true
        } else {
            console.log("Form Has Errors");
            console.log(formError);
            console.log(form);
        }
    };

    return (
        <>
            <div className='Container'>
                {/* Header */}
                <div onClick={handleToggle}>
                    <Header StepNumber='1' title='Passenger Details' />
                </div>
                {/* Body */}
                {isContentVisible &&
                    <>
                        <div className='Note px-5 py-2' style={{ backgroundColor: '#fef7cd' }}>
                            Enter your data exactly as ther appear in your passport/ID to avoid check-in complications.
                            We'll never share your data with anyone.
                        </div>
                        <div className='Body'>
                            <p>Passenger 1</p>
                            <form>
                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" name='email' value={form.email} id="email" placeholder='Enter your email' onChange={handleOnChangeForm} required />
                                    {formError.email && <div className="form-text text-danger text-start ">{formError.email}</div>}
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
                                <center><button type="submit" className="btn custom-btn" onClick={handleOnClickSaveButton} disabled={!isFormValid}>Save and continue</button></center>
                            </form>
                        </div>
                        <Step2 dataSaved={dataSaved}/>
                    </>
                }
            </div>
        </>
    )
}
