import React from 'react'

export default function SideBar() {
  return (
    <div className='col'>
    <div className='Container SideBar'>
      <div className='d-flex align-items-center'>
        <span className='pe-1'>Elmaree5</span>
        <hr style={{display: 'inline-block', width: '10%'}} />
        <span className='ps-1'>Elmaree5</span>
      </div>
      <div className='Note'>
        <div>24 Nov, 2024</div>
        <div>1 Passenger</div>
      </div>
    </div>
    <br/>
    <div className='Container SideBar'>
      <p className=''>Price BreakDown</p>
      <div className='d-flex align-items-center justify-content-between data'>
        <p>1 Adult Economy</p>
        <p>Egp 3,658</p>
      </div>
      <div className='d-flex align-items-center justify-content-between data'>
        <p>Total TAX</p>
        <p>Egp 1,658</p>
      </div>
      <hr/>
      <div className='d-flex align-items-center justify-content-between data'>
        <p>Total Fare</p>
        <p>EGP 5.765.2</p>
      </div>
    </div>
  </div>
  )
}
