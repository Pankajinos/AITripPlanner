import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { GetPlaceDetails } from '@/services/GlobalApi'
const PHOTO_URL_BASE = `https://maps.googleapis.com/maps/api/place/details/json?place_id={PLACE_ID}&fields=photos&key=${import.meta.env.VITE_GOOGLE_MAP_API}`

function Hero() {
  return (
    <div
      className="flex items-end h-[92vh] justify-center bg-[url('/bg.jpg')] bg-cover bg-no-repeat"
    >
      <div className="flex flex-col items-center justify-center z-10 bg-black bg-opacity-80 p-6 md:w-[45vw] md:h-[30vh] w-[95vw] rounded-2xl shadow-lg mb-24 ">
        <h1 className="font-bold text-2xl font-sans">
          "Your Dream Trip, Instantly Planned with{" "}
          <span className="text-bold text-red-600">AI</span>!" 🚀
        </h1>
        <p className="text-justify text-sm p-4 text-gray-300">
          Say goodbye to hours of travel planning! Our AI Trip Generator instantly
          creates personalized itineraries tailored to your interests, budget, and
          schedule. Simply enter your preferences, and let AI handle the rest. Travel smarter,
          explore better, and enjoy stress-free trips! 🚀
        </p>
        <Link to="/create-trip">
          <Button className="bg-blue-950">Get Started</Button>
        </Link>
      </div>
    </div>

  )
}

export default Hero