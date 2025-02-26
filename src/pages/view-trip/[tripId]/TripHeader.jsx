import { GetPlaceDetails } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
const PHOTO_URL_BASE=`https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&&maxWidthPx=1000&&key=${import.meta.env.VITE_GOOGLE_MAP_API}`
function TripHeader({ trip }) {
    const [placeUrl, setPlaceUrl] = useState('/illustration.svg');
    useEffect(() => {
        trip && getPlacePhoto();
    }, [trip])
 
    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location,
            languageCode: 'en'
        };
        const result = await GetPlaceDetails(data).then((resp) => {
            console.log(resp.data.places[0].photos);
            const PHOTO_URL = PHOTO_URL_BASE.replace('{NAME}',resp.data.places[0].photos[5].name);
            console.log(PHOTO_URL);
            setPlaceUrl(PHOTO_URL);
        });
    }
    return (
        <div>
            <img src={placeUrl} className=' w-[100%] h-[40vh] object-cover rounded-2xl' alt="" />
            <h1 className='font-bold text-4xl mt-6'>{trip?.tripData?.tripName}</h1>
            <div className='flex gap-5 pt-3'>
                <p className='bg-gray-300 rounded-xl px-3 py-2'>⏲️{trip?.tripData?.duration}</p>
                <p className='bg-gray-300 rounded-xl px-3 py-2'>🍹{trip?.userSelection?.noOfPeople + ' Travellers'}</p>
                <p className='bg-gray-300 rounded-xl px-3 py-2'>💰{trip?.userSelection?.budget + ' Budget'}</p>
            </div>
        </div>
    )
}

export default TripHeader