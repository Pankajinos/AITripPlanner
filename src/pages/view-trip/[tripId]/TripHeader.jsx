import { GetPlaceDetails, PHOTO_URL_BASE } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'

function TripHeader({ trip }) {
    const [placeUrl, setPlaceUrl] = useState('/illustration.svg');
    useEffect(() => {
        trip && getPlacePhoto();
    }, [trip])
    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.tripData?.location,
            languageCode: 'en'
        };
        const result = await GetPlaceDetails(data).then((resp) => {
            console.log(trip?.tripData?.location);
            const PHOTO_URL = PHOTO_URL_BASE.replace('{NAME}', resp.data.places[0].photos[2].name);
            setPlaceUrl(PHOTO_URL);
        });
    }
    return (
        <div>
            <img src={placeUrl?placeUrl:'/illustration.svg'} className=' w-[100%] h-[40vh] object-cover rounded-2xl' alt="" />
            <h1 className='font-bold text-4xl mt-6'>{trip?.tripData?.tripName}</h1>
            <div className='flex gap-5 pt-3'>
                <p className='bg-gray-300 rounded-xl px-3 py-2'>⏲️{trip?.tripData?.noOfDays + " Days "}</p>
                <p className='bg-gray-300 rounded-xl px-3 py-2'>🍹{trip?.userSelection?.traveller + ' Trip'}</p>
                <p className='bg-gray-300 rounded-xl px-3 py-2'>💰{trip?.userSelection?.budget + ' Budget'}</p>
            </div>
        </div>
    )
}

export default TripHeader