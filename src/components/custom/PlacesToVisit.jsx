import React from 'react'
import PlaceCard from './PlaceCard';

function PlacesToVisit({ trip }) {
    return (
        <div>
            <h1 className='text-2xl font-bold mt-8 '>Places to Visit</h1>
            {trip?.tripData?.itinerary?.map((plan, index) => {
                return <div className='pt-8 text-yellow-300' key={index}>
                    <h4 className='text-xl font-bold'>{"Day " + (plan.day)}</h4>
                    <div className='grid grid-cols-1 sm:grid-cols-2 [@media(min-width:1400px)]:grid-cols-3'>
                        {plan.activities.map((place, idx) => {
                            return (<PlaceCard key={idx} place={place} />)
                        })}
                    </div>
                </div>
            })}
        </div>
    )
}

export default PlacesToVisit