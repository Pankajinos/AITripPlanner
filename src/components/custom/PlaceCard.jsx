import { GetPlaceDetails } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const PHOTO_URL_BASE=`https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&&maxWidthPx=1000&&key=${import.meta.env.VITE_GOOGLE_MAP_API}`

function PlaceCard({ place, key }) {
  const [placeUrl, setPlaceUrl] = useState('/illustration.svg');
        useEffect(() => {
          place && getPlacePhoto();
        }, [place])
     
        const getPlacePhoto = async () => {
            const data = {
                textQuery: place?.placeName,
                languageCode: 'en'
            };
            const result = await GetPlaceDetails(data).then((resp) => {
                console.log(resp.data.places[0].photos);
                const PHOTO_URL = PHOTO_URL_BASE.replace('{NAME}',resp.data.places[0].photos[5].name);
                console.log(PHOTO_URL);
                setPlaceUrl(PHOTO_URL);
            });
        }
  return (<Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}}`} target='_blank'>
    <div key={key} className="flex flex-col w-[80vw] h-[80vh] md:w-[25vw] md:h-[75vh] bg-white m-2 shadow-lg rounded-2xl transition-transform hover:scale-105 overflow-hidden">
  <img src={placeUrl} className="w-full h-[40vh] object-cover" alt="Illustration" />
  <div className="flex flex-col flex-grow  p-4">
    <h2 className="text-xl font-bold text-gray-900 mt-1">{place.placeName}</h2>
        <p className="text-sm text-gray-600 mt-2">{place.placeDetails}</p>
        <p className="text-md text-blue-800 mt-2">💰 {place.ticketPrice}</p>
    <div className="flex-grow"></div>
    <div className="w-full bg-red-50 text-white p-1 flex justify-around rounded-b-2xl">
    <p className="font-medium text-red-800">⏱️ {place.timeToTravel}</p>
    </div>
  </div>
</div>

</Link> )
}

export default PlaceCard