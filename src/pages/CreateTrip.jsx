import { Input } from "@/components/ui/input"
import { Budget, SelectTravelList } from "@/constants/options"
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
            console.log(res.data);
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

        if (formData.noOfPeople > 8) {
            ToastAlert("No of people must be less than 8");
            return;
        }
        if (!formData.noOfPeople || !formData.location || !formData.traveller || !formData.budget) {
            ToastAlert("Fill all the details")
            return;
        }
        setLoading(true);
        const AI_PROMPT = `const trip = {
  tripName: "Luxry Trip To Bikaner",
  budget: "Luxry",
  travellers: "Family",
  duration: "3 days",
  noOfPeople:"4",
  location: "Bikaner",
  hotelOptions: [
    {
      hotelName: "InderLok Place",
      hotelAddress: "Near Kot Gate 11-A, Rani Bazar,Bikaner",
      price: "₹4000-₹6000",
      rating: "4",//out of 5
      description: "description of hotel",
    },
    {
      hotelName: "Chadan Place",
      hotelAddress: "Near Kot Gate 11-A, Rani Bazar,Bikaner",
      price: "₹4000-₹6000",
      rating: "4",//out of 5
      description: "description of hotel",
    },
    {
      hotelName: "Lalgarh Place",
      hotelAddress: "Near Kot Gate 11-A, Rani Bazar,Bikaner",
      price: "₹4000-₹6000",
      rating: "4",//out of 5
      description: "description of hotel",
    },
  ],
  itinerary: [
    {
      day: "1",
      themeOfDay: "Cultural visit",
      activities: [
        {
          placeName: "Junagargarh Fort",
          timeToTravel: "Morning",
          placeAddress: "Junagargarh Fort C-113, Koila Gali,Bikaner",
          ticketPrice: "₹500",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "Lalgarh Fort",
          timeToTravel: "Afternoon",
          placeAddress: "Lalgarh Fort C-113, Koila Gali,Bikaner",
          ticketPrice:"₹500",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "Local Market",
          timeToTravel: "Evening",
          placeAddress: "Raja Bazar",
          ticketPrice:"Shopping Expenses",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
      ]
    },
    {
      day: "2",
      themeOfDay: "Spiritual visit",
      activities: [
        {
          placeName: "Deshnok Temple",
          timeToTravel: "Morning",
          placeAddress: "Karni Mata Mandir,Deshnok,Bikaner",
          ticketPrice:"Free",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "Jain temple",
          timeToTravel: "Afternoon",
          placeAddress: "Lalgarh Fort C-113, Koila Gali,Bikaner",
          ticketPrice:"₹500",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "Local Market",
          timeToTravel: "Evening",
          placeAddress: "Raja Bazar",
          ticketPrice:"Shopping Expenses",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
      ]
    },
    {
      day: "3",
      themeOfDay: "Any theme as per activites",
      activities: [
        {
          placeName: "Deshnok Temple",
          timeToTravel: "Morning",
          placeAddress: "Karni Mata Mandir,Deshnok,Bikaner",
          ticketPrice:"Free",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "Jain temple",
          timeToTravel: "Afternoon",
          placeAddress: "Lalgarh Fort C-113, Koila Gali,Bikaner",
          ticketPrice:"₹500",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "Local Market",
          timeToTravel: "Evening",
          placeAddress: "Raja Bazar",
          ticketPrice:"Shopping expenses",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
      ]
    },

  ],
}

Stick to this schema and create a full trip of 3 Days for ${formData.location}, budget : ${formData.budget} , travellers: ${formData.traveller},No of people ${formData.noOfPeople}, Give me a Hotels options list with HotelName, Hotel address, Price (only range no other text), rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, in JSON format.
Stick to this schema only.`
        const result = await chatSession.sendMessage(AI_PROMPT);
        console.log(result?.response?.text())
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
        <div className="flex flex-col items-center gap-4 mt-10">
            <ToastContainerCustom />
            <div className="w-[70vw]">
                <h1 className="text-xl font-bold md:text-3xl">Tell us your travel preference 🚞</h1>
                <p>Just provide some basic information and our trip will automatically genrated based on your preference</p>
            </div>
            <div className="w-[70vw]">
                <h1 className="font-sans">Choose Destination for your Trip</h1>
                <Input placeholder={"Enter location Trip location"} onChange={(e) => { inputChangeHandler('location', e.target.value) }} />
            </div>
            <div className="w-[70vw]">
                <h1 className="font-sans">Enter number of people</h1>
                <Input type="number" placeholder={"Ex.3"} onChange={(e) => { inputChangeHandler('noOfPeople', e.target.value) }} />
            </div>
            <div className="w-[70vw]">
                <h1 className="my-3 text-xl font-medium">What's your Budget?</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Budget.map((item, index) => {
                        return (<div key={index} onClick={() => { inputChangeHandler('budget', item.title) }} className={`p-10 border rounded-lg hover:shadow-lg hover:bg-slate-100 ${formData.budget == item.title && `border-black`}`}>
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold">{item.title}</h2>
                            <h2>{item.desc}</h2>
                        </div>)
                    })}
                </div>
                <h1 className="my-3 text-xl font-medium">Who do you plan on travelling with on your next adv</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {SelectTravelList.map((item, index) => {
                        return (<div key={index} onClick={() => { inputChangeHandler('traveller', item.title) }} className={`p-10 border rounded-lg hover:shadow-lg hover:bg-gray-100 ${formData.traveller == item.title && `border-black`}`}>
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
                    <DialogContent className="p-6 bg-white rounded-2xl shadow-lg max-w-sm">
                        <DialogHeader className="flex flex-col items-center">
                            <DialogTitle>
                                <img src="/logo.svg" alt="logo" className="mx-auto" />
                            </DialogTitle>
                            <DialogDescription className="w-full text-center">
                                <h2 className="font-semibold text-gray-700 text-base my-4">Sign in with Google</h2>
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