import { GetPlaceDetails, PHOTO_URL_BASE } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { Button } from '../ui/button';

function PlaceCard({ place, key }) {
  return (
    <div className="flex flex-col flex-grow bg-white m-2">
      <p className="font-medium text-red-800">⏱️ {place?.slot}</p>
      <div className="flex flex-col mt-2 bg-slate-100 p-6 h-[50vh] md:w-[25vw] md:h-[40vh] shadow-xl rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{place?.placeName}</h2>
          <p className="text-sm text-gray-600 mt-2">{place?.placeDetails}</p>
          <p className="text-lg text-blue-700 font-medium mt-2">💰 {place?.ticketPrice}</p>
          <p className="text-sm text-gray-500 mt-2">📍 {place?.placeAddress}</p>
        </div>
        <div className="flex-grow"></div>
        <Link
          to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName}`}
          target="_blank"
        >
          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition-opacity">
            OPEN IN MAPS
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default PlaceCard