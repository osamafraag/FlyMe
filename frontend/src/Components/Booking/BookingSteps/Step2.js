import React, { useState, useEffect } from 'react'
import Header from './Header'
import { FlightBooking } from '../../../APIs/FlightBooking';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AllClasses } from '../../../APIs/AllClasses';
import Payment from './Payment';

export default function Step2({ TotalFare, setIsAllDataSaved, setClassName, setClassAdditionalCostPercentage }) {
    const navigate = useNavigate()
    const [dataSaved, setDataSaved] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedClassID, setSelectedClassID] = useState('');
    const [classOptions, setClassOptions] = useState([]);
    const [classesData, setclassesData] = useState([])
    const [paymentMethod, setpaymentMethod] = useState(null)
    const [errorMessage, seterrorMessage] = useState(false)
    const userData = useSelector(state => state.loggedInUserSlice.data);
    const token = useSelector(state => state.Token.token) || {};
    const { flights } = useParams()

    useEffect(() => {
        const fetchClassOptions = async () => {
            try {
                const data = await AllClasses();
                const classesData = data.data;
                setclassesData(classesData);

                const classes = classesData.map(classs => classs.name);
                setClassOptions(classes);

                const selectedClassData = classesData.find(classs => classs.name === selectedClass);
                if (selectedClassData) {
                    setClassAdditionalCostPercentage(selectedClassData.additionalCostPercentage);
                } else {
                    setClassAdditionalCostPercentage(0);
                }
            } catch (error) {
                console.error('Error fetching class options:', error);
            }
        };
        fetchClassOptions();
    }, [selectedClass]);

    // handle click on the header to show or not the content of the step
    const [isContentVisible, setIsContentVisible] = useState(false);
    const handleToggle = () => {
        if (dataSaved !== true)
            setIsContentVisible(!isContentVisible)
    }

    // Form State
    const [form, setForm] = useState({
        passenger: userData.id,
        category: '',
        category_name: '',
        status: 'A',
        totalCost: TotalFare,
        cashBack: 0,
        paymentMethod: paymentMethod,
        adults: 1,
        kids: 0,
        infants: 0,
        flight: '',
    })
    const [formError, setFormError] = useState({
        passenger: null,
        category: null,
        category_name: "Choose Class Please",
        status: null,
        totalCost: null,
        cashBack: null,
        paymentMethod: null,
        adults: null,
        kids: null,
        infants: null,
        flight: null,
    });

    useEffect(() => {
        console.log('paymentMethod changed:', paymentMethod);
        setForm(prevForm => ({
            ...prevForm,
            paymentMethod: paymentMethod
        }));
        console.log(form)
    }, [paymentMethod]);

    // Class
    const handleSelectClassChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedClass(selectedValue);
        setClassName(selectedValue)

        // Use the callback function of setState to ensure the latest state is used
        setSelectedClassID(prevClassID => {
            const newClassID = (classesData.find(item => item.name === selectedValue)).id;
            setForm(prevForm => ({
                ...prevForm,
                category_name: selectedValue,
                category: newClassID,
                flight: ''
            }));
            setFormError(prevForm => ({
                ...prevForm,
                category_name: null,
                category: null
            }));
            return newClassID;
        });
    };

    const isFormValid = !formError.category_name && !formError.paymentMethod && form.category_name && form.paymentMethod

    // handle click on save and submit button
    const handleOnClickSaveButton = (e) => {
        // e.preventDefault();
        if (isFormValid) {
            console.log('Form Submitted Successfully');
            console.log('form:', form)

            const flightIds = flights.split(',');

            const promises = flightIds.map((flightId) => {
                const passengerData = {
                    passenger: userData.id || '',
                    category: form.category,
                    category_name: form.category_name,
                    status: 'A',
                    totalCost: TotalFare,
                    cashBack: 0,
                    paymentMethod: paymentMethod,
                    adults: 1,
                    kids: 0,
                    infants: 0,
                    flight: parseInt(flightId)
                };

                console.log('passengerData', passengerData)
                return FlightBooking(passengerData, { Authorization: `Token ${token}` });
            });
            Promise.all(promises)
                .then((responses) => {
                    setDataSaved(true);
                    console.log('Responses:', responses);
                    setIsAllDataSaved(true);
                })
                .catch((err) => {
                    console.log('Error:', err.response.data.errors);
                    const errorsObject = err.response.data.errors;
                    if (errorsObject && typeof errorsObject === 'object') {
                        const paymentMethodErrors = errorsObject.paymentMethod;
                        const non_field_errors = errorsObject.non_field_errors

                        if (Array.isArray(paymentMethodErrors)) {
                            seterrorMessage(paymentMethodErrors);
                        } else if (Array.isArray(non_field_errors)) {
                            console.log('Error', non_field_errors)
                            if (non_field_errors == 'The fields flight, passenger must make a unique set.')
                                seterrorMessage(['You Did Book This Flight Before. Check Your Flight History Section In Your Profile.'])
                            else seterrorMessage(non_field_errors);
                        }
                        else {
                            seterrorMessage(['Something Went Worng. Please Try Again.'])
                        }
                    } else {
                        const errorsObject = err
                        console.log(errorsObject)
                        console.error('Unexpected error format:', errorsObject);
                        seterrorMessage(['Something Went Worng. Please Try Again.']);
                    }
                });

            handleToggle();
        } else {
            console.log('Form Has Errors');
            console.log(formError);
            console.log(form);
        }
    };

    useEffect(() => {
        if (isFormValid) {
            handleOnClickSaveButton()
            console.log('submit ...........----------------')
        }
    }, [isFormValid])

    return (
        <>
            <div className='Container'>
                {/* Confirmation Window/Message */}
                < Modal show={errorMessage} onHide={() => seterrorMessage(false)} className='modal-lg modal-dialog-scrollable'>
                    <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
                        <Modal.Title>Error Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#fafafa" }}>
                        <div className='border border-1 rounded-3 p-4 my-3 bg-white' >
                            <p className='fw-bold'>{
                                errorMessage == 'This field may not be null.'
                                    ?
                                    "You didn't Pay Yet."
                                    :
                                    errorMessage

                            }</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
                        <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => { navigate('/') }}>
                            Home
                        </Button>
                        <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => seterrorMessage(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Header */}
                <div onClick={handleToggle}>
                    <Header StepNumber='2' title='Extra Data And Payment' />
                </div>
                {/* Body */}
                {isContentVisible &&
                    <>
                        <div className='Note px-5 py-2' style={{ backgroundColor: '#fef7cd' }}>
                            If you want to cancel yor trip after booking, you can find it in the history section in your profile
                        </div>
                        <div className='Body bg-white'>

                            <form onSubmit={handleOnClickSaveButton}>
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
                                {
                                    selectedClass ?
                                        <Payment token={token} TotalFare={TotalFare} setpaymentMethod={setpaymentMethod} />
                                        :
                                        ''
                                }
                                {formError.paymentMethod && <div className="form-text text-danger text-start ">{formError.paymentMethod}</div>}

                                <center><button type="submit" className="mt-4 btn custom-btn" disabled={!isFormValid}>Save and continue</button></center>
                            </form>


                        </div>
                    </>
                }
            </div>

        </>
    )
}
