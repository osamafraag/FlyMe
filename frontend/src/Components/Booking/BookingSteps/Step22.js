import React, { useState, useEffect } from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FlightBooking } from '../../../APIs/FlightBooking';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AllClasses } from '../../../APIs/AllClasses';

export default function Step2({ TotalFare, onInsuranceFareChange, setIsDataSaved1 }) {
    const navigate = useNavigate()
    const [insuranceFare, setInsuranceFare] = useState(0)
    const [addInsuranceButton, setAddInsuranceButton] = useState('Add')
    const [addInsuranceIcon, setAddInsuranceIcon] = useState('faPlus')
    const [dataSaved, setDataSaved] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedClassID, setSelectedClassID] = useState('');
    const [classOptions, setClassOptions] = useState([]);
    const [classesData, setclassesData] = useState([])
    const [userDidBookBefore, setUserDidBookBefore] = useState(false)
    const userData = useSelector(state => state.loggedInUserSlice.data);
    const token = useSelector(state => state.Token.token) || {};
    const { flights } = useParams()

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
    }, []);


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
        paymentMethod: 'C',
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
            setFormError(prevForm => ({
                ...prevForm,
                category_name: null,
                category: null
            }));
            return newClassID;
        });
    };

    const isFormValid = !formError.category_name && form.category_name
    console.log(isFormValid,'isFormValid')
    console.log(form)
    console.log(!formError.category_name,'!formError.category_name')
    console.log(form.category_name,'form.category_name')

    // handle click on save and submit button
    const handleOnClickSaveButton = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('Form Submitted Successfully');

            const flightIds = flights.split(',');

            const promises = flightIds.map((flightId) => {
                const passengerData = {
                    passenger: userData.id || '',
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

                return FlightBooking(passengerData, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
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
    const handleInsuranceFare = (e) => {
        e.preventDefault();
        if (insuranceFare == 0){
            setInsuranceFare(300)
            onInsuranceFareChange(300)
            setAddInsuranceButton('Remove')
            setAddInsuranceIcon('faXmark')
        }
        else{
            setInsuranceFare(0)
            onInsuranceFareChange(0)
            setAddInsuranceButton('Add')
            setAddInsuranceIcon('faPlus')
            
        }
    }

    return (
        <>
            <div className='Container'>
                {/* Confirmation Window/Message */}
                < Modal show={userDidBookBefore} onHide={() => { navigate('/') }} className='modal-lg modal-dialog-scrollable'>
                    <Modal.Header closeButton style={{ backgroundColor: "#f4f4f4" }}>
                        <Modal.Title>Error Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "#fafafa" }}>
                        <div className='border border-1 rounded-3 p-4 my-3 bg-white' >
                            <p className='fw-bold'>You do have reserved a ticket on this flight before.</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer style={{ backgroundColor: "#f4f4f4" }}>
                        <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => { navigate('/') }}>
                            Back To Home
                        </Button>
                        <Button className='border-0' style={{ backgroundColor: "var(--main-color)" }} onClick={() => { navigate('/Profile') }}>
                            Go to Profile
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/* Header */}
                <div onClick={handleToggle}>
                    <Header StepNumber='2' title='Insurance And Extra Services' />
                </div>
                {/* Body */}
                {isContentVisible &&
                    <>
                        <div className='Body'>
                            <p>Trip cancellation Protection</p>
                            <p className='form-label' style={{ color: 'rgb(95, 95, 95)' }}>If you or your traveling companions want to cancel yor trip after booking and want a <strong>full refund</strong>, you can <strong>add 300 EGP</strong> for every passenger, or you can continue to Payment Method.</p>
                            <div className='d-flex justify-content-end'>
                                <button className='me-3 fw-semibold btn custom-outline-btn' onClick={handleInsuranceFare}> <FontAwesomeIcon icon={addInsuranceIcon} /> {addInsuranceButton}</button>
                            </div>
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
                                <center><button type="submit" className="btn custom-btn" disabled={!isFormValid}>Save and continue</button></center>
                            </form>
                            
                        </div>
                    </>
                }
            </div>

        </>
    )
}
