import React, {useState} from 'react'
import { PostClasses } from "./../APIs/Classes"
import "./classForm.css"
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faPlug, faTv } from '@fortawesome/free-solid-svg-icons';

export default function AddClass() {
  const [name, setName] = useState('noName');
  const [additionalCostPercentage, setAdditionalCostPercentage] = useState(1);
  const [seatCategory, setSeatCategory] = useState('E')
  const [mealCategory, setMealCategory] = useState('M')
  const [drinkCategory, setDrinkCategory] = useState('O')
  const [wifiAvailability, setWifiAvailability] = useState(false)
  const [powerOutlet, setPowerOutlet] = useState(false)
  const [streamEntertainment, setStreamEntertainment] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      additionalCostPercentage: additionalCostPercentage,
      seatCategory: seatCategory,
      mealCategory: mealCategory,
      drinkCategory: drinkCategory,
      wifiAvailability: wifiAvailability,
      powerOutlet: powerOutlet,
      streamEntertainment: streamEntertainment,
    }

    try {
      const response = await PostClasses(JSON.stringify(formData));
      console.log(formData)
      console.log('Post Response:', response.data);
    } catch (error) {
      console.error('Error:', error); 
    }
    navigate('/Classes')
  };
  return (
    <div className='container p-5'>
      <h3 className='text-start text-secondary my-4'>Add Class</h3>
      <div className='border border-0 text-start shadow-sm w-100'>
        <form className='container p-5' onSubmit={(e) => handleSubmit(e)}>
          {/* Aircraft Name */}
          <div class="input-group mb-3">
            <span class="input-group-text">Name</span>
            <div class="form-floating">
              <input type="text" class="form-control"  name="name" id="name" onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </div>
          </div>
          
          {/* Additional Cost Percentage */}
          <div class="input-group mb-3">
            <span class="input-group-text">Additional Cost Percentage</span>
            <div class="form-floating">
              <input type="number" min={1} max={100} class="form-control"  name="AdditionalCostPercentage" id="AdditionalCostPercentage" placeholder="Additional Cost Percentage" onChange={(e) => setAdditionalCostPercentage(e.target.value)}/>
            </div>
          </div>

          {/* Seat Category */}
          <div class="input-group mb-3">
            <span class="input-group-text">Seat Category</span>
            <div class="form-floating">
              <select class="form-select"  name="SeatCategory" id="SeatCategory " placeholder="Seat Category" onChange={(e) => setSeatCategory(e.target.value)}>
                <option value="E">Economy Class Seats</option>
                <option value="P">Premium Economy Class Seats</option>
                <option value="B">Business Class Seats</option>
                <option value="F">First-Class Seats</option>
              </select>
            </div>
          </div>

          {/* Meal Category */}
          <div class="input-group mb-3">
            <span class="input-group-text">Meal Category</span>
            <div class="form-floating">
              <select class="form-select"  name="MealCategory" id="MealCategory" placeholder="Meal Category" onChange={(e) => setMealCategory(e.target.value)}>
                <option value="S">Standard Vegetarian</option>
                <option value="V">Vegan</option>
                <option value="F">Fruit Platters</option>
                <option value="R">Raw Vegetable</option>
                <option value="M">Muslim Meal</option>
              </select>
            </div>
          </div>

          {/* Drink Category */}
          <div class="input-group mb-3">
            <span class="input-group-text">Drink Category</span>
            <div class="form-floating">
              <select class="form-select" name="DrinkCategory" id="DrinkCategory" placeholder="Drink Category" onChange={(e) => setDrinkCategory(e.target.value)}>
                <option value="O">Only Water</option>
                <option value="W">Warm Drinks Only</option>
                <option value="C">Cold Drinks Only</option>
                <option value="B">Both Cold and Warm Drinks</option>
              </select>
            </div>
          </div>

          <div className='d-flex justify-content-between my-3'>
            {/* WifiAvailability */}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="WifiAvailability" id="WifiAvailability" checked={wifiAvailability} onChange={(e) => setWifiAvailability(e.target.checked)}/>
              <label class="form-check-label" for="WifiAvailability">
                <FontAwesomeIcon icon={faWifi} style={{color: "var(--main-color)"}} /> Wifi Availability
              </label>
            </div>

            {/* PowerOutlet */}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="PowerOutlet" id="PowerOutlet" checked={powerOutlet} onChange={(e) => setPowerOutlet(e.target.checked)}/>
              <label class="form-check-label" for="PowerOutlet">
                <FontAwesomeIcon icon={faPlug} style={{color: "var(--main-color)"}} /> Power Outlet
              </label>
            </div>

            {/* Stream Entertainment */}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="StreamEntertainment" id="StreamEntertainment" checked={streamEntertainment} onChange={(e) => setStreamEntertainment(e.target.checked)}/>
              <label class="form-check-label" for="StreamEntertainment">
               <FontAwesomeIcon icon={faTv} style={{color: "var(--main-color)"}} /> Stream Entertainment
              </label>
            </div>
            
          </div>
          <button type="submit" className="btn text-white" style={{backgroundColor: "var(--main-color)"}}>
            Add Class
          </button>
        </form>
      </div>
    </div>
  )
}