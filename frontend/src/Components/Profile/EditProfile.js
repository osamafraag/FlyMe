import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCountries } from '../../APIs/Countries';
import { useSelector } from 'react-redux';
import { EditUserData } from '../../APIs/EditUser';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { loginSuccess } from "./../../Store/Slice/LoggedInUser"
import { ChangePassword } from '../../APIs/ChangePassword';
import "./Style.css"

var RegisterImage = require('../../Assets/Images/Accounts/resgister.jpg')

export default function EditProfile() {
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [passwordChangeModal, setPasswordChangeModal] = useState(false)
    const userData = useSelector(state => state.loggedInUserSlice.data);
    const token = useSelector(state => state.Token.token);
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [current_password, setCurrentPassword] = useState('');
    const [errorMessage, seterrorMessage] = useState(null)
    const [emailExists, setEmailExists] = useState(false)

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        // If !user navigate to login page 
        if (!userData || Object.keys(userData).length === 0) {
            console.log('Navigating to /Login');
            navigate('/Login');
            return;
        }

        const fetchCountries = async () => {
            try {
                const data = await getCountries();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    // Form State
    const [form, setForm] = useState({
        email: userData?.email || '',
        phone: userData?.phone || '',
        first_name: userData?.first_name || '',
        last_name: userData?.last_name || '',
        gender: userData?.gender || '',
        male: userData?.gender == 'F' ? false : true || '',
        female: userData?.gender == 'F' ? true : false || '',
        birth_date: userData?.birth_date || '',
        country: userData?.country || '',
        passport_number: userData?.passport_number || '',
        passport_expire_date: userData?.passport_expire_date || '',
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
    });

    // Return null if user data is not available
    if (!userData || Object.keys(userData).length === 0) {
        return null;
    }


    // Regex Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
            setFormError({
                ...formError,
                email:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Email"
                        : !value.match(emailRegex)
                            ? "Invalid Email, Email Should Be Like This name@example.com"
                            : emailExists
                                ? "This email already exist"
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

    const isFormValid = !formError.email && !formError.phone && !formError.first_name && !formError.last_name && !formError.male && !formError.female && !formError.birth_date && !formError.passport_number && !formError.passport_expire_date && form.email && form.phone && form.first_name && form.last_name && (form.male || form.female) && form.birth_date && form.passport_number && form.passport_expire_date

    // handle click on Save Data button
    const handleOnClickSaveData = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('form', form)
            console.log("Form Submitted Successfully");
            setShowModal(true)
        } else {
            console.log("Form Has Errors");
            console.log(formError);
            console.log(form);
        }
    };

    const handleOnClickPassword = () =>{
        console.log(token, password, userData.id)
        EditUserData(form , {Authorization: `Token ${token}`} , password, userData.id)
        .then((res) => {
            console.log('Edit Data successful');
            console.log('res.data', res.data); 
            dispatch(loginSuccess(res.data.data))
            setShowModal(false);
            navigate("/Profile")
        })
        .catch((err) => {
            console.log('Edit Data failed');
            console.log(err);
            err.response.data.email && setEmailExists('Email must be unique.');
            setShowModal(false)
            seterrorMessage(err.config.message); // Update error message
            setSuccessMessage('');
            console.log('err',err);
        });
        setShowModal(false)
    }

    const handleOnClickChangePassword = () => {
        console.log(token,userData.id)
        const id = userData.id
        ChangePassword(id, current_password, password, password2, token)
        .then((res) => {
            console.log('Edit Password successful');
            console.log('res.data', res.data);
            setPasswordChangeModal(false);
            setSuccessMessage('Password Changed successfully')
            navigate("/Profile")
        })
        .catch((err) => {
            console.log('Edit Password failed');
            console.log(err.response.data.error);
            seterrorMessage(err.response.data.error); // Update error message
            setSuccessMessage('');
        });
    }

    return (
        <div className='edit-profile py-5 px-5 d-flex justify-content-end align-items-end '>
            <div className="mx-5 p-5 shadow-lg rounded-3 bg-white text-start" style={{width: "700px"}}>
                <div className="row align-items-center">
                    <div className="col-12">
                        {(errorMessage || emailExists) && (
                            <p className="text-danger" style={{ fontSize: '14px' }}>
                                <div>{errorMessage}</div>
                                <div>{emailExists}</div>
                            </p>
                        )}
                        <form method="post" encType="multipart/form-data">

                            {/* Email */}
                            <div className=" mb-3">
                                <label htmlFor="floatingInput" className='form-label'>Email address</label>
                                <input type="email" className="form-control" id="floatingInput" value={form.email} onChange={handleOnChangeForm} placeholder='Enter your email' name="email" required />
                                {formError.email && <div className="form-text text-danger text-start ">{formError.email}</div>}
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
                                <label htmlFor="country" className="form-label">Country</label>
                                <select
                                    className="form-select"
                                    name="country"
                                    id="country"
                                    value={form.country}
                                    onChange={handleSelectChange}
                                >
                                    <option value="" disabled>Select your country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country.id}>{country.name}</option>
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
                            <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn custom-btn my-4 py-2 me-4" style={{ borderRadius: '7px' }} onClick={handleOnClickSaveData}>Save Data</button>
                            <button className="btn custom-btn my-4 py-2" style={{ borderRadius: '7px' }} onClick={() => setPasswordChangeModal(true)}>Change Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} className='modal-lg modal-dialog-scrollable'>
                <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
                    <Modal.Title>Corfirm It's you</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#fafafa" }}>
                    <form>
                        {/* Password */}
                        <p>Write Your Password To Confirm Changes, Or Press Back To Profile</p>
                        <div className=" mb-3">
                                <label htmlFor="password" className='form-label'>Password</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e)=>{setPassword(e.target.value);}} placeholder='Enter your password' name="password" required />
                        </div>
                    </form>
                    {successMessage && <p>{successMessage}</p>}
                    {errorMessage && <p className="text-danger" style={{fontSize:'14px'}}>{errorMessage}</p>}

                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
                <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => handleOnClickPassword()}>
                        Submit
                    </Button>
                    <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => navigate('/Profile')}>
                        Back to Profile
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Change Password */}
            <Modal show={passwordChangeModal} onHide={() => setPasswordChangeModal(false)} className='modal-lg modal-dialog-scrollable'>
                <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
                    <Modal.Title>Change Password Form</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#fafafa" }}>
                    <form>
                        {/* Current Password */}
                        <div className=" mb-3">
                                <label htmlFor="current_password" className='form-label'>Current Password</label>
                                <input type="password" className="form-control" id="current_password" value={current_password} onChange={(e)=>{setCurrentPassword(e.target.value);}} placeholder='Enter your current password' name="current_password" required />
                        </div>
                        {/* New Password */}
                        <div className=" mb-3">
                                <label htmlFor="password" className='form-label'>New Password</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e)=>{setPassword(e.target.value);}} placeholder='Enter your new password' name="password" required />
                        </div>
                        {/* Confirm New Password */}
                        <div className=" mb-3">
                                <label htmlFor="password2" className='form-label'>Confirm New Password</label>
                                <input type="password" className="form-control" id="password2" value={password2} onChange={(e)=>{setPassword2(e.target.value);}} placeholder='Enter your new password again' name="password2" required />
                        </div>
                    </form>
                    {successMessage && <p>{successMessage}</p>}
                    {errorMessage && <p className="text-danger" style={{fontSize:'14px'}}>{errorMessage}</p>}

                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
                <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => handleOnClickChangePassword()}>
                        Submit
                    </Button>
                    <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => navigate('/Profile')}>
                        Back to Profile
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}