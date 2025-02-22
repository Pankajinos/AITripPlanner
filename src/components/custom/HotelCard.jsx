import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCard({hotel}) {
  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName} ${hotel.hotelAddress}`} target='_blank'>
    <div className='flex flex-col h-[75vh] flex-grow '>
    <img src={'/illustration.svg'} className='rounded-xl' alt="" />
    <h1 className='font-bold text-xl'>{hotel?.hotelName}</h1>
        <p className='text-sm'>{hotel?.description}</p>
        <div className="flex-grow"></div>
    <div className='flex flex-row justify-between'>
        <p className='bg-neutral-100 rounded-lg p-1 text-sm'>💰 {hotel?.price}</p>
        <p className='bg-neutral-100 rounded-lg p-1 text-sm'>{hotel?.rating} ⭐ </p>
    </div>
</div>
</Link>
  )
}

export default HotelCard