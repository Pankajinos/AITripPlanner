import { ToastAlert } from '@/components/custom/toaster';
import { Button } from '@/components/ui/button';
import { db } from '@/services/FireBaseConfig';
import { GetPlaceDetails, PHOTO_URL_BASE } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';

function TripHeader({ trip }) {
    return (
        <div>
            {/* <img src={placeUrl?placeUrl:'/illustration.svg'} className=' w-[100%] h-[40vh] object-cover rounded-2xl' alt="" /> */}
            <h1 className='font-bold text-xl md:text-4xl mt-6'>{trip?.tripData?.tripName}</h1>
            <div className='flex flex-col items-end gap-5 justify-between pt-3 md:flex-row md:items-center'>
                <div className='flex flex-row gap-5'>
                    <p className='bg-black rounded-xl px-3 py-2 text-center'>⏲️{trip?.tripData?.duration + " Days "}</p>
                    <p className='bg-black rounded-xl px-3 py-2 text-center'>🍹{trip?.userSelection?.traveller + ' Trip'}</p>
                    <p className='bg-black rounded-xl px-3 py-2 text-center'>💰{trip?.userSelection?.budget + ' Budget'}</p>
                </div>
                </div>
        </div>
    )
}

export default TripHeader