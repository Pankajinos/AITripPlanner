import { Input } from "@/components/ui/input"
import { Budget, SelectTravelList, AI_PROMPT, Preferences } from "@/constants/options"
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
  const [isPublic, setIsPublic] = useState(false);
  const togglePublic = () => {
    setIsPublic(!isPublic);
  };
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
    console.log("%c[Trip Planner] 1. Generate button clicked", "color: #3b82f6; font-weight: bold;");
    console.log("Current Form Data:", formData);

    const user = localStorage.getItem("user");
    if (!user) {
      console.warn("[Trip Planner] No user signed in. Opening Google sign-in dialog.");
      setOpenDialog(true);
      return;
    }

    if (formData.noOfDays > 8) {
      console.warn("[Trip Planner] Validation: noOfDays exceeds 8:", formData.noOfDays);
      ToastAlert("No of Days must be less than 8");
      return;
    }
    if (!formData.noOfDays || !formData.location || !formData.traveller || !formData.budget) {
      console.warn("[Trip Planner] Validation: Missing fields:", {
        noOfDays: formData.noOfDays,
        location: formData.location,
        traveller: formData.traveller,
        budget: formData.budget,
      });
      ToastAlert("Fill all the details");
      return;
    }

    setLoading(true);
    const startTime = performance.now();
    try {
      const AT_PROMPT_FINAL =
        AI_PROMPT
          .replace('{noOfDays}', formData.noOfDays)
          .replace('{location}', formData.location)
          .replace('{budget}', formData.budget)
          .replace('{traveller}', formData.traveller);

      console.log("%c[Trip Planner] 2. Generated Prompt for Gemini AI:", "color: #10b981; font-weight: bold;");
      console.log(AT_PROMPT_FINAL);

      console.log("%c[Trip Planner] 3. Calling Gemini AI... (Buffering while AI generates trip)", "color: #f59e0b; font-weight: bold;");

      const result = await chatSession.sendMessage(AT_PROMPT_FINAL);
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);

      console.log(
        `%c[Trip Planner] 4. Gemini API Call Finished in ${elapsed}s!`,
        "color: #10b981; font-weight: bold;",
        {
          status: "SUCCESS (200 OK)",
          elapsedSeconds: elapsed,
          rawResponseLength: result?.response?.text()?.length,
        }
      );

      const rawText = result?.response?.text();
      console.log("Gemini Response Preview (first 300 chars):\n", rawText?.slice(0, 300) + "...");

      console.log("%c[Trip Planner] 5. Saving trip to Firebase Firestore...", "color: #8b5cf6; font-weight: bold;");
      await saveTrip(rawText);

      if (isPublic) {
        console.log("[Trip Planner] Saving public trip...");
        await savePublicTrip(rawText);
      }
    } catch (error) {
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      console.error(
        `%c[Trip Planner] Error during trip generation (${elapsed}s):`,
        "color: #ef4444; font-weight: bold;",
        error
      );
      ToastAlert(error.message || "Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const parseTripData = (data) => {
    if (typeof data === "object" && data !== null) {
      return data;
    }
    if (typeof data === "string") {
      let cleaned = data.trim();
      const first = cleaned.indexOf("{");
      const last = cleaned.lastIndexOf("}");
      if (first !== -1 && last !== -1 && last > first) {
        cleaned = cleaned.substring(first, last + 1);
      }
      try {
        return JSON.parse(cleaned);
      } catch (err) {
        console.warn("[parseTripData] Initial parse failed, sanitizing JSON string...", err.message);
        const sanitized = cleaned
          .replace(/\/\/.*$/gm, "")
          .replace(/,\s*([\]}])/g, "$1");
        return JSON.parse(sanitized);
      }
    }
    throw new Error("Invalid trip data format");
  };

  const saveTrip = async (tripData) => {
    try {
      setLoading(true);
      console.log("[Firestore] Parsing trip JSON...");
      const parsedData = parseTripData(tripData);
      console.log("[Firestore] Parsed trip data successfully:", parsedData);

      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();
      console.log(`[Firestore] Writing document to collection "AiTrips" with ID: ${docId}...`);

      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: parsedData,
        userEmail: user?.email,
        docId: docId,
      });

      console.log(`%c[Firestore] Document saved successfully! Navigating to /view-trip/${docId}`, "color: #10b981; font-weight: bold;");
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("%c[Firestore] Error saving trip to database:", "color: #ef4444; font-weight: bold;", error);
      ToastAlert(error.message || "Failed to save trip");
    } finally {
      setLoading(false);
    }
  };

  const savePublicTrip = async (tripData) => {
    try {
      const parsedTripData = parseTripData(tripData);
      const user = JSON.parse(localStorage.getItem("user"));
      const basicTripContent = {
        tripName: parsedTripData?.tripName,
        budget: parsedTripData?.budget,
        duration: parsedTripData?.duration,
        noOfDays: formData.noOfDays,
        noOfPeople: formData.noOfPeople,
        startDate: formData.startDate,
        location: formData.location,
        name: user?.name,
      };
      const docId = Date.now().toString();
      console.log(`[Firestore] Writing document to "PublicTrips" with ID: ${docId}...`);
      await setDoc(doc(db, "PublicTrips", docId), {
        tripData: basicTripContent,
        userEmail: user?.email,
        docId: docId,
      });
      console.log("[Firestore] Public trip saved successfully!");
    } catch (error) {
      console.error("[Firestore] Error saving public trip:", error);
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
      <div className="w-[70vw] flex items-start md:items-center flex-col  md:flex-row gap-4">
        <div>
          <h1 className="font-sans border-white">Enter number of People</h1>
          <Input
            type="number"
            placeholder="Ex. 3"
            onChange={(e) => inputChangeHandler('noOfPeople', e.target.value)}
          />
        </div>

        <div>
          <h1 className="font-sans border-white">Start Date</h1>
          <Input
            type="date"
            onChange={(e) => inputChangeHandler('startDate', e.target.value)}
          />
        </div>
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
        </div>
        <h1 className="my-3 text-xl font-medium">What are your preferences?</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Preferences.map((item, index) => {
            return (<div key={index} onClick={() => { inputChangeHandler('preference', item.title) }} className={`p-2 border rounded-lg  bg-gray-900 border-black ${formData.preference == item.title && `border-yellow-500 border-[3px]`}`}>
              <h2 className="font-bold">{item.title}</h2>
            </div>)
          })}
        </div>
        <h1 className="my-3 text-xl font-medium pt-4">Want to share your trip to find companions?</h1>
        <div className="flex gap-4">
          <div onClick={() => { setIsPublic(true) }} className={`p-2 border rounded-lg  bg-gray-900 border-black ${isPublic && `border-yellow-500 border-[3px]`}`}>
            <h2 className="text-l font-medium">{"Yes"}</h2>
          </div>
          <div onClick={() => { setIsPublic(false) }} className={`p-2 border rounded-lg  bg-gray-900 border-black ${!isPublic && `border-yellow-500 border-[3px]`}`}>
            <h2 className="text-l font-medium">{"No"}</h2>
          </div>
        </div>
        <p className="text-[rgb(122,129,37)]">By selecting 'Yes', your trip details will be shared publicly, allowing others to discover and join your journey.</p>
        <div className=" flex justify-end w-[70vw]">
          <Button
            className='mt-10'
            disabled={loading}
            onClick={generateTripHandler}
          >{loading ? <ImSpinner className="animate-spin" /> : 'Generate Trip'}
          </Button>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog} >
          <DialogContent className="p-6 bg-[rgb(40,43,40)] rounded-2xl shadow-lg max-w-sm">
            <DialogHeader className="flex flex-col items-center">
              <DialogTitle>
                <a href="/">
                  <img src="/logo.svg" alt="logo" className="mx-auto" />
                </a>
              </DialogTitle>
              <DialogDescription asChild>
                <div className="w-full text-center">
                  <span className="block font-semibold text-white text-base my-4">Sign in with Google</span>
                  <Button
                    onClick={login}
                    className="w-full py-3 flex gap-3 items-center justify-center border border-gray-300 rounded-lg hover:bg-slate-800 transition"
                  >
                    <FcGoogle className="text-xl" /> Sign up
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


      </div>
      <input type="text" />
    </div>
  </>
}