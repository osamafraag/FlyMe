import React, { useState , useEffect} from 'react';
import { createTransaction } from '../../APIs/Transactions';
import { userWallet } from '../../APIs/Wallet';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'

export default function Wallet() {
    const token = useSelector(state => state.Token.token);
    const [wallet, setWallet] = useState({});

    useEffect(() => {
        userWallet({ Authorization: `Token ${token}`})
        .then((result) => {setWallet(result.data.data)})
        .catch((error) => {console.log(error)})
    },[])

    const handleTransaction = (event,type) => {
        transaction = {
            "amount": event.target.value,
            "type": type
        }
        createTransaction({ Authorization: `Token ${token}`},transaction)
        .then((result) => {console.log(result)})
        .catch((error) => {console.log(error)})
    }
  return (
    <>
    <a onClick={() => {handleTransaction("DEPOSITE")}}>deposite</a>
    <a onClick={() => {handleTransaction("WITHDRAWAL")}}>withdraw</a>

    </>
  )
}