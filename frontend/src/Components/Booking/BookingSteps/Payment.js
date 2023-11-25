import React, { useState, useEffect } from 'react'
import Paypal from '../../Paypal/Paypal'
import './payment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { SetWallet } from '../../../Store/Slice/Wallet'
import { createTransaction } from '../../../APIs/Transactions';
import { userWallet } from '../../../APIs/Wallet';

export default function Payment({ token, TotalFare, setpaymentMethod }) {
    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    let wallet = useSelector(state => state.Wallet.wallet);
    const dispatch = useDispatch()
    console.log(wallet)

    const onApproveCardFunction = () => {
        setSuccessMessage('The Transaction Was Completed Successfully! \uD83E\uDD73');
        setpaymentMethod('C')
        setErrorMessage(false)
    }

    const handleOnErrorCard = () => {
        setErrorMessage('Sorry, There is a Problem in Your Transfer , You May Have Not Enough Money \uD83E\uDD2A');
        setSuccessMessage(false)
    }

    const handleWalet = () => {
        console.log('Wallet', wallet)
        if (wallet.available_balance < parseFloat(TotalFare)) {
            console.log("I am Here")
            setErrorMessage('Sorry, There is a Problem, You May Have Not Enough Money \uD83E\uDD2A');
            setSuccessMessage(false)
        } 
        else {
            var transaction = {
                "amount": TotalFare,
                "type": 'WITHDRAWAL'
            };
            createTransaction({ Authorization: `Token ${token}` }, transaction)
                .then((result) => {
                    userWallet({ Authorization: `Token ${token}` })
                        .then((result) => {
                            setpaymentMethod('W')
                            dispatch(SetWallet(result.data.data))
                            setSuccessMessage('The Transaction Was Completed Successfully! \uD83E\uDD73');
                            setErrorMessage(false)
                            console.log(result.data.data);
                        })
                        .catch((error) => {
                            console.log(error)
                            setErrorMessage('Sorry, There is a Problem in Sending Money To Your Wallet \uD83D\uDC40');
                            setSuccessMessage(false)
                        })
                }
                )
                .catch((error) => {
                    setErrorMessage('Sorry, There is a Problem, You May Have Not Enough Money \uD83E\uDD2A');
                    setSuccessMessage(false)
                })
        }
        console.log('wallet')
    }

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timeout = setTimeout(() => {
                setSuccessMessage(false);
                setErrorMessage(false);
            }, 10000);

            return () => clearTimeout(timeout);
        }
    }, [successMessage, errorMessage]);

    return (
        <>
            <div className='w-100'>
                <p>The Total Fare: {TotalFare}$</p>
                <label>Choose Your Payment Method</label>
                {/* Card Type */}
                <div className="">
                    {/* Wallet */}
                    <button className='my-3 btn customm-btn' type="button" onClick={handleWalet}>
                        <FontAwesomeIcon icon={faPlaneDeparture} /> My Wallet
                    </button>
                    {/* PayPal */}
                    <Paypal amount={TotalFare} onApproveFunction={onApproveCardFunction} handleOnError={handleOnErrorCard} />
                </div>
            </div>
            {errorMessage && (
                <div className="error-message alert alert-danger" style={{ fontSize: "15px" }}>
                    {errorMessage}
                </div>
            )}
            {successMessage && (
                <div className="success-message alert alert-success" style={{ fontSize: "15px" }}>
                    {successMessage}
                </div>
            )}
        </>
    )
}
