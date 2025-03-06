import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProfileCard from './ProfileCard';
function Header() {
  const [openPopUp, setPopUp] = useState(false);
  const [openDialog, setOpenDialog] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    // console.log(user?.picture)
  }, [])
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (err) => console.log(err)
  })
  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "application/json"
      }
    }).then((res) => {
      // console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data))
      localStorage.setItem("isDark", true)
      setOpenDialog(false);
    }).catch((err) => {
      console.error("Error fetching user profile:", err);
    });
  }
  return (
    <div className='p-2 shadow-sm flex justify-between align-top'>
      <a href="/">
        <img src="/logo.svg" className='ml-2 md:ml-12' alt="logo" />
      </a>
      {user ?
        <div className='flex flex-row justify-center gap-2 md:mr-8'>
          <a href="/my-trips">
            <Button>My Trips</Button>
          </a>
          <a href="/create-trip">
            <Button>Create Trip</Button>
          </a>
          <img src={user.picture} onClick={() => {
            if (openPopUp) {
              setPopUp(false)
            }
            else setPopUp(true)
          }} className='rounded-full h-8 cursor-pointer md:mr-8' alt="" />
          {openPopUp &&
            <ProfileCard user={user} setPopUp={setPopUp} />
          }
        </div> :
        <Button className='mr-2 md:mr-12' onClick={() => setOpenDialog(true)}>Sign In</Button>
      }
      <Dialog open={openDialog} onOpenChange={setOpenDialog} >
        <DialogContent className="p-6 bg-[rgb(40,43,40)] rounded-2xl shadow-lg max-w-sm">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle>
              <a href="/">
                <img src="/logo.svg" alt="logo" className="mx-auto" />
              </a>
            </DialogTitle>
            <DialogDescription className="w-full text-center">
              <h2 className="font-semibold text-white text-base my-4">Sign in with Google</h2>
              <Button
                onClick={login}
                className="w-full py-3 flex gap-3 items-center justify-center border border-gray-300 rounded-lg hover:bg-slate-800 transition"
              >
                <FcGoogle className="text-xl" /> Sign up
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header