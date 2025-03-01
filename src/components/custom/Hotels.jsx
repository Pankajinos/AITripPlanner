import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard';

function Hotels({ trip }) {
    
  return (
      <div className='flex flex-col gap-3 mt-6'>
          <h1 className='text-2xl font-bold'>Hotels Recomendations</h1>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 [@media(min-width:1400px)]:grid-cols-3'>
          {trip?.tripData?.hotelOptions?.map(( hotel, key ) => {
              return (<HotelCard hotel={hotel} />)
          })}
          </div>
      </div>
  )
}

export default Hotels