import { ToastAlert } from '@/components/custom/toaster';
import { db } from '@/services/FireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useActionData, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import TripHeader from './TripHeader';
import Hotels from '@/components/custom/Hotels';
import PlacesToVisit from '@/components/custom/PlacesToVisit';

function ViewTrip() {
    const {tripId} = useParams();//to fetch tripid from url
    const [trip, setTrip] = useState({});
    useEffect(() => {
        getTrip();
    }, [tripId])

    const getTrip = async () => {
        const docRef = doc(db, "AiTrips", tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            ToastAlert("No Trip found!");
            console.log("No such document!");
        }
    }

    
    return (
        <div className='md:p-8 flex flex-col m-4 md:m-[10vh]  md:mt-2'>
            <TripHeader trip={trip} />
            {/* hotels */}
            <Hotels trip={trip} />
            <PlacesToVisit trip={trip} />

        </div>
    )
}

export default ViewTrip