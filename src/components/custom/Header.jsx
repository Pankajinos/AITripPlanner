import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

function Header() {
    return (
      <div className='p-2 shadow-sm flex justify-between align-top'>
        <img src="/logo.svg" className='ml-6' alt="logo" />
        <Button className='mr-6' >Sign In</Button>
      </div>
  )
}

export default Header