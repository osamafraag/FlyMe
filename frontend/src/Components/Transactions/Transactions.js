import React, { useState , useEffect} from 'react';
import { userTransactions,deleteTransaction } from '../../APIs/Transactions';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-solid-svg-icons'

export default function Transaction() {
    const token = useSelector(state => state.Token.token);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchData()
    },[])
    const fetchData = () => {
      userTransactions({ Authorization: `Token ${token}`})
        .then((result) => {setTransactions(result.data)})
        .catch((error) => {console.log(error)})
    }
    const handleDeleteTransaction = (id) => {
        deleteTransaction({ Authorization: `Token ${token}`},id)
        .then((result) => {fetchData()})
        .catch((error) => {console.log(error)})
    }
  return (
    <>
    {transactions?.map((transaction,index) => {
      return(
        <>
        {transaction.amount}
        {transaction.date}
        {transaction.type}
        <a className='btn btn-danger' onClick={() => {handleDeleteTransaction(transaction.id)}}>Delete</a>
        </>
      )
    })}
    </>
  )
}