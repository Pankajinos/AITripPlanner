import { Input } from "@/components/ui/input"
import { Budget, SelectTravelList, AI_PROMPT } from "@/constants/options"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ToastContainerCustom, ToastAlert } from "@/components/custom/toaster"
import { chatSession } from "@/services/Gemni"
import { FcGoogle } from "react-icons/fc";
import { ImSpinner } from "react-icons/im";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/services/FireBaseConfig"
import { useNavigate } from "react-router-dom"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"



export function CreateTrip() {
  const [formData, setForm] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputChangeHandler = (name, value) => {
    setForm({
      ...formData,
      [name]: value,
    })
  }
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
      localStorage.setItem("user", JSON.stringify(res.data))
      setOpenDialog(false);
      generateTripHandler();
    }).catch((err) => {
      console.error("Error fetching user profile:", err);
    });
  }
  const generateTripHandler = async () => {
    const user = localStorage.getItem("user")
    if (!user) {
      setOpenDialog(true)
      return;
    }

    if (formData.noOfDays > 8) {
      ToastAlert("No of Days must be less than 4");
      return;
    }
    if (!formData.noOfDays || !formData.location || !formData.traveller || !formData.budget) {
      ToastAlert("Fill all the details")
      return;
    }
    setLoading(true);
    const AT_PROMPT_FINAL =
      AI_PROMPT
        .replace('{noOfDays}', formData.noOfDays)
        .replace('{location}', formData.location)
        .replace('{budget}', formData.budget)
        .replace('{traveller}', formData.traveller)

    const result = await chatSession.sendMessage(AT_PROMPT_FINAL);
    // console.log(AT_PROMPT_FINAL);
    // console.log(result?.response?.text())
    saveTrip(result?.response?.text());
    setLoading(false);
  }
  const saveTrip = async (tripData) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(tripData),
        userEmail: user?.email,
        docId: docId,
      });
      navigate(`/view-trip/${docId}`)
    } catch (error) {
      console.error("Error saving trip:", error);
    } finally {
      setLoading(false);
    }
  };
  return <>
    <div className="flex flex-col items-center gap-4 bg-[url('/bg2.jpg')] bg-cover bg-no-repeat bg-blend-overlay bg-black/80">
      <ToastContainerCustom />
      <div className="w-[70vw]">
        <h1 className="text-xl font-bold md:text-3xl">Tell us your travel preference 🚞</h1>
        <p>Just provide some basic information and our trip will automatically genrated based on your preference</p>
      </div>
      <div className="w-[70vw]">
        <h1 className="font-sans">Choose Destination for your Trip</h1>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_MAP_API}
          selectProps={{
            styles: {
              control: (base) => ({
                ...base,
                backgroundColor: "rgb(40, 43, 40,0.2)", // Dark background
                color: "white",
                borderRadius: "8px",
                border: "1px solid white",
              }),
              input: (base) => ({
                ...base,
                color: "white",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "rgb(30, 30, 30)", // Dark dropdown
                borderRadius: "8px",
                padding: "5px",
              }),
              option: (base, { isFocused, isSelected }) => ({
                ...base,
                backgroundColor: isSelected
                  ? "rgb(70, 70, 70)" // Darker for selected
                  : isFocused
                    ? "rgb(90, 90, 90)" // Lighter for hover
                    : "rgb(30, 30, 30)", // Default dark
                color: "white",
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
              }),
            },
            onChange: (e) => inputChangeHandler("location", e.label),
          }}
        />


      </div>
      <div className="w-[70vw]">
        <h1 className="font-sans border-white">Enter number of Days</h1>
        <Input type="number" placeholder={"Ex.3"} onChange={(e) => { inputChangeHandler('noOfDays', e.target.value) }} />
      </div>
      <div className="w-[70vw]">
        <h1 className="my-3 text-xl font-medium">What's your Budget?</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Budget.map((item, index) => {
            return (<div key={index} onClick={() => { inputChangeHandler('budget', item.title) }} className={`p-10 border rounded-lg bg-gray-900 border-black ${formData.budget == item.title && `border-yellow-500 border-[3px]`}`}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold">{item.title}</h2>
              <h2>{item.desc}</h2>
            </div>)
          })}
        </div>
        <h1 className="my-3 text-xl font-medium">Who do you plan on travelling with on your next adv</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SelectTravelList.map((item, index) => {
            return (<div key={index} onClick={() => { inputChangeHandler('traveller', item.title) }} className={`p-10 border rounded-lg  bg-gray-900 border-black ${formData.traveller == item.title && `border-yellow-500 border-[3px]`}`}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold">{item.title}</h2>
              <h2>{item.desc}</h2>
            </div>)
          })}
          <div className=" flex justify-end w-[70vw]">
            <Button
              className='mt-10'
              disabled={loading}
              onClick={generateTripHandler}
            >{loading ? <ImSpinner className="animate-spin" /> : 'Generate Trip'}
            </Button>
          </div>
        </div>
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
      <input type="text" />
    </div>
  </>
}