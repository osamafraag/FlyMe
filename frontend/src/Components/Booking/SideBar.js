import React, { useEffect, useState } from 'react'
import { FlightData } from '../../APIs/FlightData'
import { useParams } from 'react-router-dom';

export default function SideBar({insurance}) {
  const [flightData, setFlightData] = useState()
  const { flights } = useParams()
  const flightIds = flights.split(',');
  const flightID = flightIds[0]

  useEffect(()=>{
    FlightData(flightID)
    .then((res)=>{
      setFlightData(res.data.data)
      console.log(flightData)
    })
    .catch((err) => console.log(err))
  },[flightID])
  console.log('flightData',flightData)

  const Total_TAX = flightData?.baseCost * 0.1 || 0;
  const Total_Fare = flightData?.baseCost + Total_TAX + insurance || 0;
  

  return (
    <div className='col'>
    <div className='Container SideBar'>
      <div className='d-flex align-items-center text-start'>
        <span className='pe-1 Note'>{flightData?.from}</span>
        <hr style={{display: 'inline-block', width: '10%'}} />
        <span className='ps-1 Note'>{flightData?.to}</span>
      </div>
      <div className='Note'>
        <div>24 Nov, 2024</div>
        <div>Number of Passengers: 1</div>
      </div>
    </div>
    <br/>
    <div className='Container SideBar'>
      <p className=''>Price BreakDown</p>
      <div className='d-flex align-items-center justify-content-between data'>
        <p>1 Adult Economy</p>
        <p>Egp {flightData?.baseCost}</p>
      </div>
      <div className='d-flex align-items-center justify-content-between data'>
        <p>Total TAX</p>
        <p>Egp {Total_TAX}</p>
      </div>
      <div className='d-flex align-items-center justify-content-between data'>
        <p>Insurance And Extra Services</p>
        <p>Egp {insurance}</p>
      </div>
      <hr/>
      <div className='d-flex align-items-center justify-content-between data'>
        <p>Total Fare</p>
        <p>EGP {Total_Fare}</p>
      </div>
    </div>
  </div>
  )
}
