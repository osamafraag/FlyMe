import React, { useState, useEffect } from 'react'
import Header from './Header'
import Step2 from './Step2';
import { useSelector } from 'react-redux';
import { getCountries } from '../../../APIs/Countries';
import { FlightBooking } from '../../../APIs/FlightBooking';
import { AllClasses } from '../../../APIs/AllClasses';
import { useNavigate, useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Step1({ TotalFare, setIsDataSaved1 }) {
    const navigate = useNavigate()
    const [userDidBookBefore, setUserDidBookBefore] = useState(false)
    const { flights } = useParams()
    let userData = useSelector(state => state.loggedInUserSlice.data);
    const [dataSaved, setDataSaved] = useState(false);

    // handle click on the header to show or not the content of the step
    const [isContentVisible, setIsContentVisible] = useState(false);
    const handleToggle = () => {
        if (dataSaved !== true)
            setIsContentVisible(!isContentVisible)
    }

    // Call api Countries + Classes
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [classOptions, setClassOptions] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedClassID, setSelectedClassID] = useState('');
    const [classesData, setclassesData] = useState([])
    useEffect(() => {
        const fetchClassOptions = async () => {
            try {
                const data = await AllClasses();
                const classes = data.data.map(classs => classs.name);
                setclassesData(data.data)
                setClassOptions(classes);
            } catch (error) {
                console.error('Error fetching class options:', error);
            }
        };
        fetchClassOptions();

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
        if (userData.gender == 'F') {
            setForm(prevForm => ({
                ...prevForm,
                female: true,
                male: false
            }));
        }
        else {
            setForm(prevForm => ({
                ...prevForm,
                female: false,
                male: true,
            }));
        }
    }, [userData.gender, dataSaved]);

    // Form State
    const [form, setForm] = useState({
        passenger: userData.id || '',
        email: userData.email || '',
        phone: userData.phone || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        male: '',
        female: '',
        birth_date: userData.birth_date || '',
        country: userData.country || '',
        passport_number: userData.passport_number || '',
        passport_expire_date: userData.passport_expire_date || '',
        category: '',
        category_name: '',
        status: 'A',
        totalCost: TotalFare,
        cashBack: 0,
        paymentMethod: 'C',
        adults: 1,
        kids: 0,
        infants: 0,
        flight: '',
    })
    const [formError, setFormError] = useState({
        email: null,
        phone: null,
        first_name: null,
        last_name: null,
        male: null,
        female: null,
        birth_date: null,
        country: null,
        passport_number: null,
        passport_expire_date: null,
        category: null
    });


    // Regex Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^01[0125][0-9]{8}$/;      // 010, 011, 012 or 015 + other 8 digits
    const passport_numberRegex = /(^A)[0-9]{8}$/;         // A + 8 numbers

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
                female: name === 'female'
            });
            setFormError({
                ...formError,
                male: null,
                female: null
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
                    enteredDate >= today
                        ? 'Expirty Date cannot be after today'
                        : null
            })
        }
        // Payment Method
        else if (name === 'category') {
            setForm({
                ...form,
                category: value
            });
            setFormError({
                ...formError,
                category:
                    value == null
                        ? 'Choose your Payment Method'
                        : null
            })
        }
    }
    // Country
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCountry(selectedValue);
        setForm((prevForm) => ({
            ...prevForm,
            country: selectedValue
        }))
    };

    // Class
    const handleSelectClassChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedClass(selectedValue);

        // Use the callback function of setState to ensure the latest state is used
        setSelectedClassID(prevClassID => {
            const newClassID = (classesData.find(item => item.name === selectedValue)).id;
            setForm(prevForm => ({
                ...prevForm,
                category_name: selectedValue,
                category: newClassID
            }));
            return newClassID;
        });
    };

    const isFormValid = !formError.category_name && !formError.email && !formError.phone && !formError.first_name && !formError.last_name && (!formError.male || !formError.female) && !formError.birth_date && !formError.country && !formError.passport_number && !formError.passport_expire_date && form.category_name && form.email && form.phone && form.first_name && form.last_name && (form.male || form.female) && form.birth_date && form.country && form.passport_number && form.passport_expire_date

    const handleOnClickSaveButton = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('Form Submitted Successfully');

            const flightIds = flights.split(',');

            const promises = flightIds.map((flightId) => {
                const passengerData = {
                  passenger: userData.id || '',
                  email: form.email,
                  phone: form.phone,
                  first_name: form.first_name,
                  last_name: form.last_name,
                  male: form.male,
                  female: form.female,
                  birth_date: form.birth_date,
                  country: form.country,
                  passport_number: form.passport_number,
                  passport_expire_date: form.passport_expire_date,
                  category: form.category,
                  category_name: form.category_name,
                  status: 'A',
                  totalCost: TotalFare,
                  cashBack: 0,
                  paymentMethod: 'C',
                  adults: 1,
                  kids: 0,
                  infants: 0,
                  flight: parseInt(flightId)
                };

                return FlightBooking(passengerData);
            });

            Promise.all(promises)
                .then((responses) => {
                    setDataSaved(true);
                    console.log('Responses:', responses);
                    setIsDataSaved1(true);
                })
                .catch((err) => {
                    console.log('Error:', err);
                    setUserDidBookBefore(true);
                });
                console.log('called')

            handleToggle();
        } else {
            console.log('Form Has Errors');
            console.log(formError);
            console.log(form);
        }
    };

    return (
        <>
            <div className='Container'>
                {/* Confirmation Window/Message */}
                < Modal show={userDidBookBefore} onHide={()=>{navigate('/')}} className='modal-lg modal-dialog-scrollable'>
                    <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
                        <Modal.Title>Error Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#fafafa" }}>
                        <div className='border border-1 rounded-3 p-4 my-3 bg-white' >
                            <p className='fw-bold'>You do have reserved a ticket on this flight before.</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
                        <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={()=>{ navigate('/') }}>
                            Back To Home
                        </Button>
                        <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => { navigate('/Profile') }}>
                            Go to Profile
                        </Button>
                    </Modal.Footer>
                </Modal>

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
                            <form onSubmit={handleOnClickSaveButton}>
                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" name='email' value={form.email} id="email" placeholder='Enter your email' onChange={handleOnChangeForm} required />
                                    {formError.email && <div className="form-text text-danger text-start ">{formError.email}</div>}
                                </div>
                                {/* Phone Number */}
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    <input type="number" className="form-control" name='phone' value={form.phone} id="phone" placeholder='Enter your phone number' onChange={handleOnChangeForm} required />
                                    {formError.phone && <div className="form-text text-danger text-start ">{formError.phone}</div>}
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
                                        <input
                                            type="radio"
                                            checked={form.male}
                                            id="male"
                                            name="gender"
                                            onChange={handleOnChangeForm}
                                            required
                                        />
                                        <label htmlFor="male" className="form-label px-2">Male</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            checked={form.female}
                                            id="female"
                                            name="gender"
                                            onChange={handleOnChangeForm}
                                            required
                                        />
                                        <label htmlFor="female" className="form-label px-2">Female</label>
                                    </div>
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
                                {/* Class */}
                                <div className="mb-3">
                                    <label htmlFor="category_name" className="form-label">Class</label>
                                    <select className="form-control" name='category_name' value={form.category_name} id="category_name" onChange={handleSelectClassChange} required>
                                        <option value="" disabled>Select a class</option>
                                        {classOptions.map((classOption, index) => (
                                            <option key={index} value={classOption}>{classOption}</option>
                                        ))}

                                    </select>
                                    {formError.category && <div className="form-text text-danger text-start ">{formError.category}</div>}
                                </div>
                                <center><button type="submit" className="btn custom-btn" disabled={!isFormValid}>Save and continue</button></center>
                            </form>
                        </div>
                    </>
                }
            </div >
        </>
    )
}

