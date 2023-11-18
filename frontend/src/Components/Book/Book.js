import React from 'react'
import "./../Home/Landing.css"
import FlightSearchForm from "./FlightSearchForm"
import Offers from './Offers'

export default function BookSearch() {
  return (
    <div style={{backgroundColor: "var(--alternative-white-color)"}}>
    <div style={{height: "750px"}}>
      <div className="landing py-5 position-relative" style={{height: "500px"}}>

        <div className="heading mx-auto text-white my-5" style={{width: "70%"}}>
          <h1 className="text-center mb-4 text-white" style={{color: "var(--main-color)"}}>Fly Beyond Boundaries</h1>
          <p className=" lh-lg fs-5 text-white" style={{color: "var(--main-color)"}}>Traveling is not just about reaching a destination; it's about embracing new experiences, expanding your horizons, and finding inspiration in the unknown.</p>
        </div>

        <div className="search-form mx-auto bg-white py-5 rounded-3 shadow-sm" style={{width: "80%"}}>
          <FlightSearchForm />
        </div>
      </div>
    </div>

    {/* Offers */}
    <div className='mx-auto pb-5' style={{width: "80%"}}>
      <h2 className='text-secondary text-start mb-5 px-1'>Offers</h2>
      <div className='px-3'>
        <Offers />
      </div>
    </div>
    </div>
  )
}