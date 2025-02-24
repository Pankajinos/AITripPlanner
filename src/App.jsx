import { useEffect, useState } from 'react'
import Hero from './components/custom/Hero'
function App() {
  return (
    <>
      <Hero></Hero>
    </>
  )
}

export default App

const trip = {
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
          ticketPrice:"null",
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
          ticketPrice:"free",
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
          ticketPrice:"null",
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
          ticketPrice:"free",
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
          ticketPrice:"null",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
      ]
    },

  ],
}
