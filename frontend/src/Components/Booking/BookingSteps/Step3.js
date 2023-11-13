import React, { useState, useEffect } from 'react'
import Header from './Header'
import { redirect } from 'react-router-dom';

export default function Step3() {
    // handle click on the header to show or not the content of the step
    const [isContentVisible, setIsContentVisible] = useState(false);
    const handleToggle = () => {
        setIsContentVisible(!isContentVisible)
    }

    // Form State
    const [form, setForm] = useState({
        firstName: '',

    })
    const [formError, setFormError] = useState({
        firstName: null,
    });

    // Regex Validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // handle form on change
    const handleOnChangeForm = (event) => {
        let name = event.target.name
        let value = event.target.value

        // Name Validations
        if (name === 'firstName') {
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
 
    }

   const isFormValid = !formError.firstName && form.firstName

    // handle click on save and submit button
    const handleOnClickSaveButton = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Form Submitted Successfully");
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
                        <img src='../../../Assets/Images/Booking/Mada.png' className="credit-card" />
                            <form>
                                {/* First Name */}
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" name='firstName' value={form.firstName} id="firstName" placeholder='Enter your first name' onChange={handleOnChangeForm} required />
                                    {formError.firstName && <div className="form-text text-danger text-start ">{formError.firstName}</div>}
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
