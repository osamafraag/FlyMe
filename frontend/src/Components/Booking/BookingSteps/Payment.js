import React, { useState, useEffect } from 'react'
import Paypal from '../../Paypal/Paypal'
import './payment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture, faBell } from '@fortawesome/free-solid-svg-icons'

export default function Payment() {
    const [errorMessage, seterrorMessage] = useState(null)
    const [dataSaved, setDataSaved] = useState(false);
    // handle click on the header to show or not the content of the step
    const [isContentVisible, setIsContentVisible] = useState(false);
    const handleToggle = () => {
        if (dataSaved !== true)
            setIsContentVisible(!isContentVisible)
    }

    // handle click on save and submit button
    const handleOnClickSaveButton = (e) => {
        e.preventDefault();
        // if (isFormValid) {
        //     console.log("Form Submitted Successfully");
        //     handleToggle();
        //     setDataSaved(true)
        // } else {
        //     console.log("Form Has Errors");
        //     seterrorMessage('Please enter all data.')
        //     console.log(formError);
        //     console.log(form);
        // }
    };

    return (
        <>
            <div className='w-100'>
                <label>Choose Your Payment Method</label>
                {/* Card Type */}
                <center>
                    <div className="m-3 w-50">
                        {/* Wallet */}
                        <div className='my-3 btn customm-btn'> <FontAwesomeIcon icon={faPlaneDeparture} /> My Wallet</div>
                        {/* PayPal */}
                        <Paypal cost={30} />
                    </div>
                </center>
            </div>
            {(errorMessage) && (
                <div className="text-danger" style={{ fontSize: '14px' }}>
                    <div>{errorMessage}</div>
                </div>
            )}
        </>
    )
}
