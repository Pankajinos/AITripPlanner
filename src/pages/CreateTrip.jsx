import { Input } from "@/components/ui/input"
import { Buget, SelectTravelList } from "@/constants/options"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ToastContainerCustom, ToastAlert } from "@/components/custom/toaster"
import { chatSession } from "@/services/Gemni"
import { FcGoogle } from "react-icons/fc";
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



export function CreateTrip() {
    const [formData, setForm] = useState([]);
    const [openDialog, setOpenDialog] = useState(false)
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
            //google auth
            setOpenDialog(true)
            return;
        }

        if (formData.noOfPeople > 8) {
            ToastAlert("No of people must be less than 8");
            return;
        }
        if (!formData.noOfPeople || !formData.location || !formData.traveller || !formData.buget) {
            ToastAlert("Fill all the details")
            return;
        }
        const AI_PROMPT = `Genreate Travel plan for : ${formData.location} for 3 Days for ${formData.traveller} with a ${formData.buget},give me hotel option list,with HotelName,HotelAddress,Price,Hotel image url, geocordinates, rating, description and suggest itinerary with PlaceName, Place Details, Place image url,Geo coordinates, ticket pricing.Time to travel each of these loaction in 3 days with each day plan with best time to visit all these places in JSON format`
        const result = await chatSession.sendMessage(AI_PROMPT);
        // console.log(output)
        console.log(result?.response?.text())
    }
    // useEffect(() => {
    //     const timmer=setTimeout(() => {

    //         console.log(formData);
    //     }, 500);
    //     return ()=>clearTimeout(timmer)
    // },[formData])

    return <>
        <div className="flex flex-col items-center gap-4 mt-10">
            <ToastContainerCustom />
            <div className="w-[70vw]">
                <h1 className="font-bold text-3xl">Tell us your travel preference 🚞</h1>
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
                <h1 className="my-3 text-xl font-medium">What's your Buget?</h1>
                <div className="grid grid-cols-4 gap-4">
                    {Buget.map((item, index) => {
                        return (<div key={index} onClick={() => { inputChangeHandler('buget', item.title) }} className={`p-10 border rounded-lg hover:shadow-lg hover:bg-slate-100 ${formData.buget == item.title && `border-black`}`}>
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold">{item.title}</h2>
                            <h2>{item.desc}</h2>
                        </div>)
                    })}
                </div>
                <h1 className="my-3 text-xl font-medium">Who do you plan on travelling with on your next adv</h1>
                <div className="grid grid-cols-4 gap-4">
                    {SelectTravelList.map((item, index) => {
                        return (<div key={index} onClick={() => { inputChangeHandler('traveller', item.title) }} className={`p-10 border rounded-lg hover:shadow-lg hover:bg-gray-100 ${formData.traveller == item.title && `border-black`}`}>
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold">{item.title}</h2>
                            <h2>{item.desc}</h2>
                        </div>)
                    })}
                    <div className=" flex justify-end w-[70vw]">
                        <Button className='mt-10' onClick={generateTripHandler}>Generate Trip</Button>
                    </div>
                </div>
                <Dialog open={openDialog}>
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