import { db } from '@/services/FireBaseConfig';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripCard from './UserTripCard';

function MyTrips() {
    const [userTrips, setUserTrips] = useState([]);
    useEffect(() => {
        getuserTrips();
    }, [])
    const getuserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/');
            return;
        }
        console.log(user);
        const q = query(collection(db, "AiTrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        // console.log("Before"+userTrips);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            //prevVal is  used because of asynchronous behaviour 
            setUserTrips(prevVal=>[...prevVal,doc.data()])
        });
        
    }
  return (
      <div className="flex flex-col items-center gap-4 ">
          <h2 className='text-2xl font-bold'>My Trips</h2>
          <div className='grid grid-cols-3 gap-4'>
              {console.log(userTrips)}
              {userTrips?.length>0?userTrips.map((trip, idx) => {
                return (<UserTripCard trip={trip}/>)
          }) :[1, 2, 3, 4, 5, 6].map((item, idx) => {
                return (<div key={idx} className='w-[24vw] h-[55vh] animate-pulse bg-slate-300 rounded-lg'></div>)
            })}
            </div>
    </div>
  )
}

export default MyTrips