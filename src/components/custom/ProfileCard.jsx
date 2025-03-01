import React from 'react'
import { Button } from '../ui/button';

function ProfileCard({user,setPopUp}) {
  return (
      <div className='absolute md:right-28 right-12 top-2 flex flex-col items-center p-4 gap-2 rounded-lg z-30 bg-cyan-950'>
          <p className='absolute right-0 top-0 m-2 mr-4 font-mono tracking-wider cursor-pointer' onClick={() => {setPopUp(false)}}>x</p>
          <img src={user?.picture} className='rounded-full h-8' alt="" />
          <p>{user.name}</p>
          <p>{user.email}</p>
          <Button
                onClick={() => {
                  localStorage.clear();
                  setPopUp(false);
                  window.location.reload();
                }}
              >Logout
            </Button>
    </div>
  )
}

export default ProfileCard