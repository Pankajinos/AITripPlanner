import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom'
import { Button } from '../ui/button';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/services/FireBaseConfig';
import { GetPlaceDetails, PHOTO_URL_BASE } from '@/services/GlobalApi';

function UserTripCard({ trip }) {
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
            console.log("Url of "+trip?.tripData?.location+"is ")
            console.log(PHOTO_URL)
            setPlaceUrl(PHOTO_URL);
        });
    }
    return (
        <a href={`/view-trip/${trip?.docId}`} target='_blank'>
            <div className='flex flex-col w-[90vw] min-h-[50vh] sm:w-[45vw] sm:min-h-[60vh] [@media(min-width:1400px)]:w-[24vw] [@media(min-width:1400px)]:min-h-[55vh] rounded-lg bg-[rgb(63,63,63)] ' >
                <img src={placeUrl} className='object-cover w-[90vw] h-[35vh] sm:w-[45vw] sm:h-[35vh] [@media(min-width:1400px)]:w-[24vw] [@media(min-width:1400px)]:h-[35vh] rounded-t-lg' alt="" />
                <div className='flex flex-col flex-grow justify-between items-start p-4 gap-3'>
                    <h2 className='font-bold text-xl md:text-2xl text-white'>{trip?.tripData?.tripName}</h2>
                    <p className='text-slate-300'>{"For Duration of " + trip?.tripData?.duration}</p>
                    <div className="flex-grow"></div>
                    <Button className='w-full bg-blue-500'>More Info</Button>
                </div>
            </div >
        </a>
    )
}

export default UserTripCard