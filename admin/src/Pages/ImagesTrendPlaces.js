import React, {useEffect} from 'react'
import ImagesTrendPlaces from '../Components/ImagesTrendPlaces/ImagesTrendPlaces'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ImagesTrendPlace() {
  let userData = useSelector(state => state.loggedInUserSlice.data);
  const navigate = useNavigate()
  // If !user navigate to login page 
  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      console.log('Navigating to /Login');
      navigate('/Login');
    }
  }, [userData, navigate]);
  return (
    <div className='container py-5 px-4'>
      <h3 className='text-start text-secondary my-4'>Trending Places Images</h3>
        <ImagesTrendPlaces/>
    </div>
  )
}
