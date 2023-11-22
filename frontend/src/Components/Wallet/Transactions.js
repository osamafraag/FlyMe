import React, { useState , useEffect} from 'react';
import { userTransactions,deleteTransaction } from '../../APIs/Transactions';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'

export default function Wallet() {
    const token = useSelector(state => state.Token.token);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        userTransactions({ Authorization: `Token ${token}`})
        .then((result) => {setTransactions(result.data)})
        .catch((error) => {console.log(error)})
    },[])

    const handleDeleteTransaction = (id) => {
        deleteTransaction({ Authorization: `Token ${token}`},id)
        .then((result) => {console.log(result)})
        .catch((error) => {console.log(error)})
    }
  return (
    <>
    {transactions?.map((transaction,index) => {
        <a onClick={() => {handleDeleteTransaction(transaction.id)}}>Delete</a>
    })}
    </>
  )
}