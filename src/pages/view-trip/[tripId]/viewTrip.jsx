import { ToastAlert } from '@/components/custom/toaster';
import { db } from '@/services/FireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useActionData, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import TripHeader from './TripHeader';
import Hotels from '@/components/custom/Hotels';
import PlacesToVisit from '@/components/custom/PlacesToVisit';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Button } from '@/components/ui/button';

function ViewTrip() {
    const { tripId } = useParams();//to fetch tripid from url
    const [trip, setTrip] = useState({});
    const [companionsChecked, setCompanionsChecked] = useState(false);

    useEffect(() => {
        getTrip();
    }, [tripId])

    const getTrip = async () => {
        const docRef = doc(db, "AiTrips", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setTrip(docSnap.data());
        }
        else {
            ToastAlert("No Trip found!");
            console.log("No such document!");
        }
    }

    const [matchedTrips, setMatchedTrips] = useState([]);
    useEffect(() => {
        // Only call getCompanions when trip.tripData exists
        if (trip && trip.tripData && trip.tripData.location) {
            getCompanions();
        }
    }, [])

    const getCompanions = async () => {
        try {
            const publicTripsRef = collection(db, "PublicTrips");
            const q = query(publicTripsRef, where("tripData.location", "==", trip.tripData.location));

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const matchingTrips = [];
                querySnapshot.forEach((doc) => {
                    // Exclude the current user's own trip
                    if (doc.data().userEmail !== trip.userEmail) {
                        matchingTrips.push({ id: doc.id, ...doc.data() });
                    }
                });

                setMatchedTrips(matchingTrips);
                setCompanionsChecked(true);
                console.log("Matching trips:", matchedTrips);

            } else {
                ToastAlert("No matching trips found!");
                console.log("No matching trips found!");
            }
        } catch (error) {
            console.error("Error getting companion trips:", error);
        }
    };


    return (
        <div className='flex flex-col m-4 md:m-[10vh]  md:mt-2'>
            <TripHeader trip={trip} />
            {/* hotels */}
            <Hotels trip={trip} />
            <PlacesToVisit trip={trip} />
            {companionsChecked && matchedTrips.length === 0 && (
                <p className="text-red-500 mt-4">No matching trips found.</p>
            )}

            {!companionsChecked && (
                <div className='flex flex-start mt-10'>
                    <Button className="bg-red-700 w-[200px]" onClick={getCompanions}>
                        Find Companions
                    </Button>
                </div>
            )}

            {companionsChecked && matchedTrips.length > 0 && (
                <div>
                    <h4 className='text-3xl font-bold text-yellow-400 pl-0 p-10'>
                        Other Trips to {trip.tripData.location}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {matchedTrips.map((item, index) => (
                            <div key={index} className="bg-black shadow-md p-6 rounded-xl text-white">
                                <h1 className="text-2xl font-bold text-green-400 mb-4">{item.tripData.tripName}</h1>
                                <div className="space-y-1">
                                    <p><span className="font-semibold">Budget:</span> {item.tripData.budget}</p>
                                    <p><span className="font-semibold">Duration:</span> {item.tripData.duration}</p>
                                    <p><span className="font-semibold">People:</span> {item.tripData.noOfPeople}</p>
                                    <p><span className="font-semibold">Start Date:</span> {item.tripData.startDate}</p>
                                    <p><span className="font-semibold">Booked by:</span> {item.name}</p>
                                    <p><span className="font-semibold">Contact:</span> {item.userEmail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}


        </div>
    )
}

export default ViewTrip