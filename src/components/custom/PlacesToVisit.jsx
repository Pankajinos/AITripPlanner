import React from 'react'
import PlaceCard from './PlaceCard';

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h1 className='text-2xl font-bold mt-8 '>Places to Visit</h1>
            {trip?.tripData?.itinerary?.map((plan, index) => {
                return <div className='p-1 md:p-6' key={index}>
                    <h4 className='text-xl font-bold'>{"Day " + (plan.day)}</h4>
                    <div className='flex flex-col md:flex-row'>
                        {plan.activities.map((place, index) => {
                            return (<PlaceCard key={index} place={place} />)
                        })}
                    </div>
                </div>
            })}
        </div>
    )
}

export default PlacesToVisit