import { GetPlaceDetails, PHOTO_URL_BASE } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'

function TripHeader({ trip }) {
    return (
        <div>
            {/* <img src={placeUrl?placeUrl:'/illustration.svg'} className=' w-[100%] h-[40vh] object-cover rounded-2xl' alt="" /> */}
            <h1 className='font-bold text-xl md:text-4xl mt-6'>{trip?.tripData?.tripName}</h1>
            <div className='flex flex-row gap-5 pt-3'>
                <p className='bg-black rounded-xl px-3 py-2 text-center'>⏲️{trip?.tripData?.duration + " Days "}</p>
                <p className='bg-black rounded-xl px-3 py-2 text-center'>🍹{trip?.userSelection?.traveller + ' Trip'}</p>
                <p className='bg-black rounded-xl px-3 py-2 text-center'>💰{trip?.userSelection?.budget + ' Budget'}</p>
            </div>
        </div>
    )
}

export default TripHeader