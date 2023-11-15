import React, { useState, useEffect } from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Step3 from './Step3';

export default function Step2({dataSaved}) {
    // handle click on the header to show or not the content of the step
    const [isContentVisible, setIsContentVisible] = useState(false);
    const handleToggle = () => {
        console.log(dataSaved)
        if (dataSaved) 
        setIsContentVisible(!isContentVisible)
    }

    // handle click on save and submit button
    const [dataSavedd, setDataSavedd] = useState(false);
    const handleOnClickSaveButton = (e) => {
        e.preventDefault();
        setDataSavedd=true
    };

    return (
        <>
            <div className='Container'>
                {/* Header */}
                <div onClick={handleToggle}>
                    <Header StepNumber='2' title='Insurance And Extra Services' />
                </div>
                {/* Body */}
                {isContentVisible &&
                    <>
                        <div className='Body'>
                            <p>Trip cancellation Protection</p>
                            <p className='form-label' style={{color: 'rgb(95, 95, 95)'}}>If you or your traveling companions want to cancel yor trip after booking and want a <strong>full refund</strong>, you can <strong>add 300 EGP</strong> for every passenger, or you can continue to Payment Method.</p>
                            <div className='d-flex justify-content-end'>
                            <button className='me-3 fw-semibold btn custom-outline-btn'> <FontAwesomeIcon icon={faPlus} /> Add</button>
                            </div>
                            <center><button className='me-3 fw-semibold btn custom-btn' onClick={handleOnClickSaveButton}>Continue To Payment Method</button></center>
                        </div>
                    </>
                }
                <Step3  dataSaved={dataSavedd} />
            </div>
            
        </>
    )
}
