import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCard({ place, key }) { 
  // const [placeUrl, setPlaceUrl] = useState('/illustration.svg');
  // useEffect(() => {
  // const fetchPlaceImage = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
  //         place.placeName
  //       )}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
  //     );
  //     const data = await response.json();
  //     if (data.results.length) {
  //       setPlaceUrl(data.results[0].urls.regular);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching image from Unsplash:", error);
  //   }
  //   };
    
  //   fetchPlaceImage();
  // }, [place.placeName]);

  // console.log(place);
  return (<Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}}`} target='_blank'>
    <div key={key} className="flex flex-col w-[80vw] h-[80vh] md:w-[25vw] md:h-[75vh] bg-white m-2 shadow-lg rounded-2xl transition-transform hover:scale-105 overflow-hidden">
  <img src='/illustration.svg' className="w-full h-[40vh] object-cover" alt="Illustration" />
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