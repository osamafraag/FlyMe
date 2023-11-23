import React from 'react'
import HomeComponent from './../Components/Home/Home'
import Paypal from '../Components/Paypal/Paypal'

export default function Home() {
  return (
    <div>
      <Paypal/>
      <HomeComponent />
    </div>
  )
}