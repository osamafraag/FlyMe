import React, { useState, useEffect } from 'react';
import { createTransaction } from '../../APIs/Transactions';
import { userWallet } from '../../APIs/Wallet';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Wallet.css'
// import PaymentCard from './../PaymentCard/PaymentCard';
import Paypal from './../Paypal/Paypal'
import ReactDOM from 'react-dom';
import { SetWallet } from '../../Store/Slice/Wallet';
import { useDispatch } from 'react-redux';

export default function Wallet() {
  const token = useSelector(state => state.Token.token);
  const [wallet, setWallet] = useState({});
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('')
  const [error, setError] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    userWallet({ Authorization: `Token ${token}` })
      .then((result) => { 
        setWallet(result.data.data); 
        dispatch(SetWallet(result.data.data))
        console.log(result.data.data); 
      })
      .catch((error) => { console.log(error) })
  }

  const handleDepositeClick = () => {
    if (amount === 0) {
      setError('There Is An Error, You May Enter Value Less Than 1');
    } else {
      setType('Deposite');
      setError(false);
    }
  };

  const handleDesposite = (amountFromPaypal) => {
    setType('');
    var transaction = {
      amount: amountFromPaypal,
      type: 'DEPOSIT',
    };
    createTransaction({ Authorization: `Token ${token}` }, transaction)
      .then((result) => {
        fetchData();
        setSuccessMessage('The Transaction Was Completed Successfully! \uD83E\uDD73');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Sorry, There is a Problem in Sending Money To Your Wallet \uD83D\uDC40');
      });
  };

  const handleOnError = () => {
    setErrorMessage('Sorry, There is a Problem in Your Transfer , You May Have Not Enough Money \uD83E\uDD2A');
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

  const handleWithdraw = () => {
    setType('WITHDRAWAL')
    setError(false)
    var transaction = {
      "amount": amount,
      "type": 'WITHDRAWAL'
    };
    createTransaction({ Authorization: `Token ${token}` }, transaction)
      .then((result) => {
        fetchData()
      }
      )
      .catch((error) => {
        console.log(error)
        setError('There Is An Error, You May Enter Value Less Than 1')
      })
  }
  return (
    <div className='row'>
      <div className='col-6 row'>
        <ul className='col-6'>
          <li className='available'>Available Balance</li>
          <li className='pendding'>Pendding Balance</li>
          <li className='withdrawal'>Withdrawal</li>
        </ul>
        <ul className='col-6 list-unstyled '>
          <li>{wallet.available_balance}<span style={{ fontSize: "13px" }} className='text-secondary'>$</span></li>
          <li>{wallet.pendding_balance}<span style={{ fontSize: "13px" }} className='text-secondary'>$</span></li>
          <li>{wallet.withdrawal}<span style={{ fontSize: "13px" }} className='text-secondary'>$</span ></li>
        </ul>
      </div>

      <div className='col-6'>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Amount</span>
          <input type='number' onChange={(event) => { setAmount(event.target.value) }} class="form-control" aria-label="Amount" aria-describedby="basic-addon1" />
          <a className='btn text-white' style={{ background: "var(--main-color)" }} onClick={() => { handleDepositeClick() }}><FontAwesomeIcon icon={faPlus} /></a>
          <a className='btn btn-danger' onClick={() => { handleWithdraw() }}><FontAwesomeIcon icon={faMinus} /></a>
        </div>
        {error && <p className='text-danger' style={{ fontSize: "15px" }}>{error}</p>}

        {type == 'Deposite' &&
          <div>
            <Paypal amount={amount} onApproveFunction={handleDesposite} handleOnError={handleOnError} />
          </div>
        }

        {errorMessage && (
          <div className="error-message alert alert-danger" style={{fontSize: "15px"}}>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="success-message alert alert-success" style={{fontSize: "15px"}}>
            {successMessage}
          </div>
        )}
        {/* <PaymentCard/> */}
      </div>
    </div>
  )
}