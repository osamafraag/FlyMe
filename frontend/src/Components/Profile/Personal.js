import React, { useEffect, useState } from 'react';
import Woman from "./../../Assets/Images/Profile/Woman.jpg"
import Man from "./../../Assets/Images/Profile/Man.jpg"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen, faUserXmark, faGauge } from "@fortawesome/free-solid-svg-icons";
import Transaction from './../Transactions/Transactions';
import Wallet from './../Wallet/Wallet';

export default function Personal({userData}) {
  const navigate = useNavigate()

  const handleDashboardButtonClick = () => {
    window.open('http://localhost:3001/', '_blank');
  };
  return (
    <div className="row align-items-center ">
      <div className="col-2  py-5 text-center ">
        <div className="image">
          <img src={userData?.image || (userData.gender == 'F' ? Woman : Man)}  width="130" height="130" className="rounded-circle img-fluid" />
        </div>
        <div className="basic-info ">
          <p className="fs-5">{userData?.first_name} {userData?.last_name}</p>
        </div>
        <hr />
        <div className="action py-4 d-flex justify-content-evenly align-items-center ">
          <button type="button" className="btn text-white" style={{backgroundColor: "var(--main-color)"}} onClick={() => { navigate('/EditProfile') }}><FontAwesomeIcon icon={faUserPen} /></button>

          <button type="button" className="btn btn-danger" onClick={() => { navigate(`/deleteAccount`) }}><FontAwesomeIcon icon={faUserXmark} /></button>

          {
            userData?.is_superuser &&
            <button type="button" className="btn btn-warning text-white" onClick={handleDashboardButtonClick}><FontAwesomeIcon icon={faGauge} /></button>
          }
          
        </div>
      </div>
      <div className="col-10 d-flex flex-column align-items-center">
        <table className="table table-borderless shadow-sm rounded-3 text-start">
          <tr>
            {/* First Name */}
            <td className="border-0 p-4  bg-white" style={{borderTopLeftRadius: '0.5rem'}}><strong>First Name: </strong></td>
            <td className="border-0 p-4  w-25" style={{backgroundColor: 'var(--main-color)', color: 'white'}}>{userData?.first_name}</td>

            {/* Last Name */}
            <td className="border-0 p-4  bg-white "><strong>Last Name: </strong></td>
            <td className="border-0 p-4  w-25" style={{backgroundColor: 'var(--main-color)', color: 'white', borderTopRightRadius: '0.5rem'}}>{userData?.last_name}</td>
          </tr>

          <tr>
            {/* Username */}
            <td className="border-0 p-4  bg-white"><strong>Username: </strong></td>
            <td className="border-0 p-4 w-25" style={{backgroundColor: 'var(--main-color)', color: 'white'}}>{userData?.username}</td>

            {/* Email */}
            <td className="border-0 p-4  bg-white"><strong>Email: </strong></td>
            <td className="border-0 p-4" style={{backgroundColor: 'var(--main-color)', color: 'white'}}>{userData?.email}</td>
          </tr>

          <tr>
            {/* Gender */}
            <td className="border-0 p-4  bg-white"><strong>Gender: </strong></td>
            <td className="border-0 p-4" style={{backgroundColor: 'var(--main-color)', color: 'white'}}>{userData?.gender == "F" ? "Female" : "Male"}</td>

            {/* Birth Date */}
            <td className="border-0 p-4  bg-white"><strong>Birth Date: </strong></td>
            <td className="border-0 p-4" style={{backgroundColor: 'var(--main-color)', color: 'white'}}>{userData?.birth_date}</td>
          </tr>

          <tr>
            {/* Phone */}
            <td className="border-0 p-4  bg-white"><strong>Phone: </strong></td>
            <td className="border-0 p-4" style={{backgroundColor: 'var(--main-color)', color: 'white'}}>{userData?.phone}</td>

            {/* Country */}
            <td className="border-0 p-4  bg-white"><strong>Country: </strong></td>
            <td className="border-0 p-4" style={{backgroundColor: 'var(--main-color)', color: 'white'}}>{userData?.country_name}</td>
          </tr>

          <tr>
            {/* Passport Number */}
            <td className="border-0 p-4  bg-white" style={{borderBottomLeftRadius: '0.5rem'}}><strong>Passport Number: </strong></td>
            <td className="border-0 p-4" style={{backgroundColor: 'var(--main-color)', color: 'white'}}>{userData?.passport_number}</td>

            {/* Passport Expire Date */}
            <td className="border-0 p-4  bg-white"><strong>Passport Expire Date: </strong></td>
            <td className="border-0 p-4" style={{backgroundColor: 'var(--main-color)', color: 'white', borderBottomRightRadius: '0.5rem'}}>{userData?.passport_expire_date}</td>
          </tr>

        </table>
      </div>

      <div className='offset-2 col-10 px-2 mt-4'>
        <div className=' p-5 shadow-sm rounded-3 text-start bg-white'>
          <Wallet/>
        </div>
      </div>
    </div>
  )
}