import { GetPlaceDetails,PHOTO_URL_BASE } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function HotelCard({ hotel }) {
  const [hotelUrl, setHotelUrl] = useState('/illustration.svg');
      useEffect(() => {
          hotel && getHotelPhoto();
      }, [hotel])
      const getHotelPhoto = async () => {
          const data = {
                textQuery: hotel?.hotelName,
              languageCode: 'en'
          };
          const result = await GetPlaceDetails(data).then((resp) => {
              console.log(resp.data.places[0].photos);
              const PHOTO_URL = PHOTO_URL_BASE.replace('{NAME}',resp.data.places[0].photos[5].name);
              console.log(`For ${hotel.hotelName} url is :`);
              console.log(PHOTO_URL);
              if(PHOTO_URL) setHotelUrl(PHOTO_URL);
          });
      }
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName} ${hotel.hotelAddress}`} target='_blank'>
    <div className='flex flex-col h-[75vh] flex-grow '>
    <img src={hotelUrl} className='rounded-xl object-cover h-[60vh]'  alt="" />
    <h1 className='font-bold text-xl'>{hotel?.hotelName}</h1>
        <p className='text-sm'>{hotel?.description}</p>
        <div className="flex-grow"></div>
    <div className='flex flex-row justify-between'>
        <p className='bg-neutral-100 rounded-lg p-1 text-sm'>💰 {hotel?.price}</p>
        <p className='bg-neutral-100 rounded-lg p-1 text-sm'>{hotel?.rating} ⭐ </p>
    </div>
</div>
</Link>
  )
}

export default HotelCard