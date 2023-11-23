import React, { useState , useEffect} from 'react';
import { createTransaction } from '../../APIs/Transactions';
import { userWallet } from '../../APIs/Wallet';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Wallet.css'
import PaymentCard from './../PaymentCard/PaymentCard';

export default function Wallet() {
    const token = useSelector(state => state.Token.token);
    const [wallet, setWallet] = useState({});
    const [amount, setAmount] = useState(0);

    useEffect(() => {
      fetchData()
    },[])
     
    const fetchData = () => {
      userWallet({ Authorization: `Token ${token}`})
        .then((result) => {setWallet(result.data.data)})
        .catch((error) => {console.log(error)})
    }

    const handleTransaction = (type) => {
        var transaction = {
            "amount": amount,
            "type": type
        };
        createTransaction({ Authorization: `Token ${token}`},transaction)
        .then((result) => {fetchData()})
        .catch((error) => {console.log(error)})
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
          <li>{wallet.available_balance}<span style={{fontSize: "13px"}} className='text-secondary'>$</span></li>
          <li>{wallet.pendding_balance}<span style={{fontSize: "13px"}} className='text-secondary'>$</span></li>
          <li>{wallet.withdrawal}<span style={{fontSize: "13px"}} className='text-secondary'>$</span ></li>
        </ul>
      </div>
      
      <div className='col-6'>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Amount</span>
          <input type='number' onChange={(event) => {setAmount(event.target.value)}} class="form-control" aria-label="Amount" aria-describedby="basic-addon1" />
          <a className='btn text-white' style={{background: "var(--main-color)"}} onClick={() => {handleTransaction("DEPOSIT")}}><FontAwesomeIcon icon={faPlus} /></a>
          <a className='btn btn-danger' onClick={() => {handleTransaction("WITHDRAWAL")}}><FontAwesomeIcon icon={faMinus} /></a>
        </div>

        <PaymentCard/>
      </div>
    </div>
  )
}