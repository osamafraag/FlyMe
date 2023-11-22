import React, { useState , useEffect} from 'react';
import { createTransaction } from '../../APIs/Transactions';
import { userWallet } from '../../APIs/Wallet';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'

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
    <>
    {wallet.available_balance}
    {wallet.pendding_balance}
    {wallet.withdrawal}
    <input type='number' onChange={(event) => {setAmount(event.target.value)}}></input>
    <a className='btn btn-primary' onClick={() => {handleTransaction("DEPOSIT")}}>deposite</a>
    <a className='btn btn-primary' onClick={() => {handleTransaction("WITHDRAWAL")}}>withdraw</a>

    </>
  )
}