import { db } from '@/services/FireBaseConfig';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';

function MyTrips() {
    const navigate = useNavigation();
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
        querySnapshot.forEach((doc) => {
            //prevVal is  used because of asynchronous behaviour 
            setUserTrips(prevVal=>[...prevVal,doc.data()])
        });
        
    }
    console.log(userTrips);
  return (
    <div>MyTrips</div>
  )
}

export default MyTrips