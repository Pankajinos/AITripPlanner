import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/services/GlobalApi'
const PHOTO_URL_BASE = `https://maps.googleapis.com/maps/api/place/details/json?place_id={PLACE_ID}&fields=photos&key=${import.meta.env.VITE_GOOGLE_MAP_API}`

function Hero() {
  // useEffect(() => {
  //   getPlacePhoto();
  // }, [])
  
  // const fetchPlaceRef = async (url) => {
  //   const response = await fetch(url);
  //   const data = await response.json();
  // }

  // const getPlaceRefernce = async () => {
  //         // console.log(trip?.userSelection?.location);
  //         const data = {
  //             textQuery: "Bikaner",
  //             languageCode: 'en'
  //         };
  //         await GetPlaceDetails(data).then((resp) => {
  //             console.log(resp.data);
  //             const PHOTO_URL = PHOTO_URL_BASE.replace('{PLACE_ID}',resp.data.places[0].id);
  //           return fetchPlaceRef(PHOTO_URL);
  //         });
    // }
  return (
      <div className='flex flex-col-reverse md:flex-row justify-between items-center'>
          <div className='flex flex-col items-center'>
          <h1 className='p-8 font-extrabold text-4xl font-sans '>"Your Dream Trip, Instantly Planned with <span className='text-bold text-red-600'>AI</span>!" 🚀</h1>
          <p className='p-10 text-justify'>Say goodbye to hours of travel planning! Our AI Trip Generator instantly creates personalized itineraries tailored to your interests, budget, and schedule. Whether you crave adventure, relaxation, or culture, our smart algorithm curates the best destinations and experiences for you. Simply enter your preferences, and let AI handle the rest. Travel smarter, explore better, and enjoy stress-free trips! 🚀</p>
              <Link to='/create-trip'>
              <Button>Get Started</Button>
              </Link>
          </div>
          <img src="./illustration.svg" className='w-[90vw] md:w-[44vw]' alt="" />
    </div>
  )
}

export default Hero