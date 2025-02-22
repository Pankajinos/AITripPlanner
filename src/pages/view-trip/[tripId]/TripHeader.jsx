import React from 'react'
function TripHeader({ trip }) {
    console.log(trip);
    return (
        <div>
            <img src="/illustration.svg" className=' w-[100%] h-[40vh] object-cover rounded-2xl' alt="" />
            <h1 className='font-bold text-4xl mt-6'>{trip?.tripData?.tripName}</h1>
            <div className='flex gap-5 pt-3'>
                <p className='bg-gray-300 rounded-xl px-3 py-2'>⏲️{trip?.tripData?.duration}</p>
                <p className='bg-gray-300 rounded-xl px-3 py-2'>🍹{trip?.userSelection?.noOfPeople+' Travellers'}</p>
                <p className='bg-gray-300 rounded-xl px-3 py-2'>💰{trip?.userSelection?.buget+' Buget'}</p> 
            </div>
        </div>
    )
}

export default TripHeader