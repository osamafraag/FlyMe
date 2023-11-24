import React, { useState, useEffect } from 'react'
import Paypal from '../../Paypal/Paypal'
import './payment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

export default function Payment({TotalFare, setpaymentMethod}) {
    const [errorMessage, seterrorMessage] = useState(null)
    
    const onApproveCardFunction = () =>{
        seterrorMessage(false)
        setpaymentMethod('C')
    }

    const handleOnErrorCard = ()=>{
        seterrorMessage(true)
    }

    const handleWalet = () =>{
        // To Be Countinue ......
        setpaymentMethod('W')
        console.log('wallet')
    }

    return (
        <>
            <div className='w-100'>
                <label>Choose Your Payment Method</label>
                {TotalFare}
                {/* Card Type */}
                    <div className="">
                        {/* Wallet */}
                        <div className='my-3 btn customm-btn'> <FontAwesomeIcon icon={faPlaneDeparture} onClick={handleWalet}/> My Wallet</div>
                        {/* PayPal */}
                        <Paypal amount={TotalFare} onApproveFunction={onApproveCardFunction} handleOnError={handleOnErrorCard} />
                    </div>
            </div>
            {(errorMessage) && (
                <div className="text-danger" style={{ fontSize: '14px' }}>
                    <div>Something Went Wrong, Please Make Sure You Have Enough Money In Your Account.</div>
                </div>
            )}
        </>
    )
}
