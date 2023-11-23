import React, { useState , useEffect} from 'react';
import { userPaymentCards,addPaymentCard,deletePaymentCard } from '../../APIs/PaymentCards';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'

export default function PaymentCard() {
    const token = useSelector(state => state.Token.token);
    const [paymentCards, setPaymentCards] = useState([]);
    const [paymentCard, setPaymentCard] = useState({type:null,cardholder_name:null,card_number:null,
        expiration_date:null,CVV:null});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        fetchData()
    },[])
    const fetchData = () => {
        userPaymentCards({ Authorization: `Token ${token}`})
        .then((result) => {setPaymentCards(result.data)})
        .catch((error) => {console.log(error)})
    }
    const handleDeletePaymentCard = (id) => {
        deletePaymentCard({ Authorization: `Token ${token}`},id)
        .then((result) => {fetchData()})
        .catch((error) => {console.log(error)})
    }
    const handleAdd = () => {
        addPaymentCard({ Authorization: `Token ${token}`},paymentCard)
        .then((result) => {fetchData()})
        .catch((error) => {console.log(error)})
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setPaymentCard({
          ...paymentCard,
          [name]: value,
        });
      };
  return (
  <>
    {paymentCards?.map((paymentCard,index) => {
        return(
        <>
            {paymentCard.type}
            {paymentCard.cardholder_name}
            {paymentCard.card_number}
            {paymentCard.expiration_date}
            {paymentCard.CVV}
            <a className='btn btn-danger' onClick={() => {handleDeletePaymentCard(paymentCard.id)}}>Delete</a>
        </>
        )
    })}
        <a className='btn text-white' style={{backgroundColor: "var(--main-color)"}} onClick={() => {setShow(true)}}><FontAwesomeIcon icon={faCreditCard} /> Add PaymentCard</a>
        <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add PaymentCard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="input-group form-floating mx-auto w-75 mt-3">
          <span class="input-group-text" for="inputGroup4">Type</span>
          <select class="form-control" id="inputGroup4" required name='type'
          onChange={handleInputChange}>
            <option value='VISA'>VISA</option>
            <option value='MEZA'>MEZA</option>
            <option value='MASTER'>MASTER CARD</option>
          </select>
        </div>
        <div class="input-group form-floating mx-auto w-75 mt-3">
          <span class="input-group-text" for="inputGroup5">cardholder_name</span>
          <input type="text" class="form-control" id="inputGroup5" required name='cardholder_name'
          onChange={handleInputChange}/>
        </div>
        <div class="input-group form-floating mx-auto w-75 mt-3">
          <span class="input-group-text" for="inputGroup6">card_number</span>
          <input type="text" class="form-control" id="inputGroup6" required name='card_number'
          onChange={handleInputChange}/>
        </div>
        <div class="input-group form-floating mx-auto w-75 mt-3">
          <span class="input-group-text" for="inputGroup7">CVV</span>
          <input type="text" class="form-control" id="inputGroup7" required name='CVV'
          onChange={handleInputChange}/>
        </div>
        <div class="input-group form-floating mx-auto w-75 mt-3">
          <span class="input-group-text" for="inputGroup8">expiration_date</span>
          <input type="date" class="form-control" id="inputGroup8" required name='expiration_date'
          onChange={handleInputChange}/>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='border-0' style={{backgroundColor: "var(--main-color)"}} onClick={()=>{handleAdd();handleClose()}}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}