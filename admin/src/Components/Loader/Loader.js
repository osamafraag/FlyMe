import React from 'react'
import Spinner from './../../Assets/Images/Spinner1.gif'

export default function Loader() {
    return (
      <div className='d-flex justify-content-center align-items-center' role="status" style={{height: "50vh"}}>
        <img src={Spinner} style={{width: "50px", height: "50px"}}/>
      </div>    
    )
}