import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPen, faUserXmark, faGauge, faAddressCard, faTicket, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons"
import Personal from './Personal';
import Booking from './Booking';
import Transaction from './Transaction';

const Profile = ({userData, token}) => {
  const [profileType, setProfileType] = useState('Personal');
 
  const handleSearchTypeChange = (type) => {
    setProfileType(type);
  };

  if (!userData || Object.keys(userData).length === 0) {
    return null;
  }
  return (
    <div className='bg-light py-5'>
      <div className='container p-5'>
        <div className='mb-4 text-start'>
          <button className={profileType === 'Personal' ? 'btn me-3 active type' : 'btn me-3 type'} onClick={() => handleSearchTypeChange('Personal')}><FontAwesomeIcon icon={faAddressCard} /> Personal Information</button>
          <button className={profileType === 'Booking' ? 'btn me-3 active type' : 'btn me-3 type'}  onClick={() => handleSearchTypeChange('Booking')}><FontAwesomeIcon icon={faTicket} /> Booking History</button>
          <button className={profileType === 'Transaction' ? 'btn me-3 active type' : 'btn me-3 type'} onClick={() => handleSearchTypeChange('Transaction')}><FontAwesomeIcon icon={faMoneyBillTransfer} /> Transaction History</button>
        </div>
        <hr style={{color: "var(--main-color)"}}/>
        {profileType === 'Personal' && <Personal userData={userData} />}
        {profileType === 'Booking' && <Booking userData={userData} token={token} />}
        {profileType === 'Transaction' && <Transaction />}
      </div>
    </div>
  );
};

export default Profile;