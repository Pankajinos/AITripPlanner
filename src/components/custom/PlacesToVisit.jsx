import React from 'react'
import PlaceCard from './PlaceCard';

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h1 className='text-2xl font-bold mt-8 '>Places to Visit</h1>
                {trip?.tripData?.itinerary?.map((place, index) => {
                    return <div className='p-1 md:p-6'>
                        <h4 className='text-xl font-bold'>{"Day " + (index + 1)}</h4>
                        <div className='flex flex-col md:flex-row'>
                            <PlaceCard key={index} place={place.morning} slot={"Morning"} />
                            <PlaceCard key={index} place={place.afternoon} slot={"Afternoon"}/>
                            <PlaceCard key={index} place={place.evening} slot={"Evening"} />
                        </div>
                    </div>
                })}
        </div>
    )
}

export default PlacesToVisit