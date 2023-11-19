import React, { useState, useEffect } from 'react'
import Header from './Header'

var Miza = require('../../../Assets/Images/Booking/miza.jpg')
var Visa = require('../../../Assets/Images/Booking/Visa.png')
var MasterCard = require('../../../Assets/Images/Booking/MasterCard.png')


export default function Step3({setIsDataSaved3}) {
    const [errorMessage, seterrorMessage] = useState(null)
    const [dataSaved, setDataSaved] = useState(false);
    // handle click on the header to show or not the content of the step
    const [isContentVisible, setIsContentVisible] = useState(false);
    const handleToggle = () => {
        if (dataSaved !== true) 
        setIsContentVisible(!isContentVisible)
    }

    // Form State
    const [form, setForm] = useState({
        cardNumber: '',
        cardHolderName: '',
        expirtyDate: '',
        miza:'',
        visa:'',
        masterCard:'',
    })
    const [formError, setFormError] = useState({
        cardNumber: null,
        cardHolderName: null,
        expirtyDate: null,
        miza: null,
        visa: null,
        masterCard: null,
    });

    // Regex Validations

    // handle form on change
    const handleOnChangeForm = (event) => {
        let name = event.target.name
        let value = event.target.value

        // Card Type
        if (name === 'miza' || name === 'visa' || name === 'masterCard') {
            setForm({
                ...form,
                miza: name === 'miza',
                visa: name === 'visa',
                masterCard: name === 'masterCard'
            });
        }
        // Card Number Validations
        else if (name === 'cardNumber') {
            setForm({
                ...form,
                cardNumber: value
            });
            setFormError({
                ...formError,
                cardNumber:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Card Number"
                        : null
            })
        }
        // Card Holder Name Validations
        if (name === 'cardHolderName') {
            setForm({
                ...form,
                cardHolderName: value
            });
            setFormError({
                ...formError,
                cardHolderName:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Card Holder Name"
                        : null
            })
        }
        // Expirty Date
        if (name === 'expirtyDate') {
            setForm({
                ...form,
                expirtyDate: value
            });
            setFormError({
                ...formError,
                expirtyDate:
                    value.trim(" ").length === 0
                        ? "You Should Enter Your Expirty Date"
                        : null
            })
        }

    }

    const isFormValid = !formError.cardNumber && !formError.cardHolderName && !formError.expirtyDate && (!formError.miza || !formError.visa || !formError.masterCard ) && form.cardNumber && form.cardHolderName && form.expirtyDate && (form.miza || form.visa || form.masterCard )

    // handle click on save and submit button
    const handleOnClickSaveButton = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Form Submitted Successfully");
            handleToggle();
            setDataSaved(true)
            setIsDataSaved3(true)
        } else {
            console.log("Form Has Errors");
            seterrorMessage('Please enter all data.')
            console.log(formError);
            console.log(form);
        }
    };

    return (
        <>
            <div className='Container'>
                {/* Header */}
                <div onClick={handleToggle}>
                    <Header StepNumber='3' title='Payment Method' />
                </div>
                {/* Body */}
                {isContentVisible &&
                    <>
                        <div className='Note px-5 py-2' style={{ backgroundColor: '#fef7cd' }}>
                            Enter your data correctly or won't be accepted.
                            We'll never share your data with anyone.
                        </div>
                        <div className='Body'>
                        {(errorMessage) && (
                            <div className="text-danger" style={{ fontSize: '14px' }}>
                                <div>{errorMessage}</div>
                            </div>
                        )}
                            <form>
                                {/* Card Type */}
                                <div className="mb-3 d-flex">
                                    <div className="mr-5">
                                        <input type="radio" checked={form.miza} id="miza" name="miza" value={form.miza} onChange={handleOnChangeForm} required />
                                        <label htmlFor="miza" className="form-label px-2">
                                            <img src={Miza} className="credit-card" />
                                        </label>
                                    </div>
                                    <div className="mr-5">
                                        <input type="radio" checked={form.visa} id="visa" name="visa" value={form.visa} onChange={handleOnChangeForm} required />
                                        <label htmlFor="visa" className="form-label px-2">
                                            <img src={Visa} className="credit-card" />
                                        </label>
                                    </div>
                                    <div className="mr-5">
                                        <input type="radio" checked={form.masterCard} id="masterCard" name="masterCard" value={form.masterCard} onChange={handleOnChangeForm} required />
                                        <label htmlFor="masterCard" className="form-label px-2">
                                            <img src={MasterCard} className="credit-card" />
                                        </label>
                                    </div>
                                </div>
                                {/* Card Number */}
                                <div className="mb-3">
                                    <label htmlFor="cardNumber" className="form-label">Card Number</label>
                                    <input type="number" className="form-control" name='cardNumber' value={form.cardNumber} id="cardNumber" placeholder='Enter your Card Number' onChange={handleOnChangeForm} required />
                                    {formError.cardNumber && <div className="form-text text-danger text-start ">{formError.cardNumber}</div>}
                                </div>
                                {/* Card Holder Name */}
                                <div className="mb-3">
                                    <label htmlFor="cardHolderName" className="form-label">Card Holder Name</label>
                                    <input type="text" className="form-control" name='cardHolderName' value={form.cardHolderName} id="cardHolderName" placeholder='Enter the Card Holder Name' onChange={handleOnChangeForm} required />
                                    {formError.cardHolderName && <div className="form-text text-danger text-start ">{formError.cardHolderName}</div>}
                                </div>
                                {/* Card Expirty Date */}
                                <div className="mb-3">
                                    <label htmlFor="expirtyDate" className="form-label">Expirty Date</label>
                                    <input type="date" className="form-control" name='expirtyDate' value={form.expirtyDate} id="expirtyDate" placeholder='Enter your Card Number' onChange={handleOnChangeForm} required />
                                    {formError.expirtyDate && <div className="form-text text-danger text-start ">{formError.expirtyDate}</div>}
                                </div>
                                <center><button type="submit" className="btn custom-btn" onClick={handleOnClickSaveButton}>Save and continue</button></center>
                            </form>
                        </div>
                    </>
                }
            </div>
        </>
    )
}
