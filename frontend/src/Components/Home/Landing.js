import "./Landing.css"
import React from 'react'
import FlightSearchForm from "../Book/FlightSearchForm"


export default function Landing() {
  return (
    <div style={{height: "750px"}}>
      <div className="landing py-5 position-relative" style={{height: "500px"}}>

        <div className="heading mx-auto text-white my-5" style={{width: "70%"}}>
          <h1 className="landing-text text-center mb-4" style={{color: "var(--main-color)"}}>Fly Beyond Boundaries</h1>
          <p className=" landing-text lh-lg fs-5" style={{color: "var(--main-color)"}}>Traveling is not just about reaching a destination; it's about embracing new experiences, expanding your horizons, and finding inspiration in the unknown.</p>
        </div>

        <div className="search-form mx-auto bg-white py-5 rounded-3 shadow" style={{width: "80%"}}>
          <FlightSearchForm />
        </div>
      </div>
    </div>
  )
}