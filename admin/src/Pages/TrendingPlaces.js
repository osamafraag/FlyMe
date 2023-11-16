import React from 'react'
import TrendingPlaces from '../Components/TrendingPlaces/TrendingPlaces'

export default function TrendingPlace() {
  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary'>Trending Places</h3>
      <TrendingPlaces/>
    </div>
  )
}