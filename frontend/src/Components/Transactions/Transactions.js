import React, { useState, useEffect } from 'react';
import { userTransactions, deleteTransaction } from '../../APIs/Transactions';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Transaction() {
  const token = useSelector(state => state.Token.token);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = () => {
    userTransactions({ Authorization: `Token ${token}` })
      .then((result) => { setTransactions(result.data) })
      .catch((error) => { console.log(error) })
  }
  const handleDeleteTransaction = (id) => {
    deleteTransaction({ Authorization: `Token ${token}` }, id)
      .then((result) => { fetchData() })
      .catch((error) => { console.log(error) })
  }
  return (
    <div>
      {
        transactions.length == 0
        ?
        <div className="card mb-4 mb-lg-0 border-0 shadow-sm">
      <div className="card-body p-0">
        <ul className="list-group list-group-flush rounded-3 p-4" style={{ listStyleType: 'none' }}>
          <li className="text-center">You Didn't Make Any Transaction</li>
        </ul>
        </div>
        </div>
        :
        <table className="table table-hover shadow-sm my-3">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.map((transaction, index) => {
              return (
                <tr>
                  <th>{transaction.date}</th>
                  <th>{transaction.amount}</th>
                  <th>{transaction.type}</th>
                  <th><a className='btn border-0' onClick={() => { handleDeleteTransaction(transaction.id) }}><FontAwesomeIcon icon={faTrash} className='text-danger' /></a></th>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </div>

  )
}