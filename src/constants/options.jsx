export const SelectTravelList = [
  { 
    id: 1,
    title: "Solo",
    desc: "A single traveller",
    icon: "👤",
    people: '1 person',
  },
  { 
    id: 2,
    title: "Couple",
    desc: "Two travelers",
    icon: "👫", 
    people: '2 people',
  },
  { 
    id: 3,
    title: "Family",
    desc: "Group of fun loving people",
    icon: "🏠", 
    people: '3 to 5 people',
  },
  { 
    id: 4, 
    title: "Friends",
    desc: "A bunch of thrill seekers",
    icon: "👯‍♀️", 
    people: '6 to 10 people',
  },
];

export const Budget = [
  { 
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of cost",
    icon: "💰", 
  },
  { 
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💳", 
  },
  { 
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💎",
  },
];
export const Preferences = [
  { 
    id: 1,
    title: "Religious and spiritual",
    
  },
  { 
    id: 2,
    title: "Adventures and activities",
  },
  { 
    id: 3,
    title: "Historical and cultural"
  },
  { 
    id: 4,
    title: "Nature and scenic beauty"
  },
  { 
    id: 5,
    title: "Urban and modern attractions"
  },
  { 
    id: 6,
    title: "None"
  },
];

export const AI_PROMPT = `Example schema trip, const trip = {
  tripName: "Luxry Trip To XYZ",
  budget: "Luxry",
  travellers: "Family",
  duration: "N days",
  location: "XYZ",
  hotelOptions: [
    {
      hotelName: "ABC",
      hotelAddress: "Near Kot Gate 11-A, Rani Bazar,Bikaner",
      price: "₹4000-₹6000",
      rating: "4",//out of 5
      description: "description of hotel",
    },
    {
      hotelName: "ABC",
      hotelAddress: "Near Kot Gate 11-A, Rani Bazar,Bikaner",
      price: "₹4000-₹6000",
      rating: "4",//out of 5
      description: "description of hotel",
    },
    {
      hotelName: "ABC",
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
          placeName: "ABC",
          timeToTravel: "Morning",
          slot:"08:00 AM - 12:00 PM",
          placeAddress: "Junagargarh Fort C-113, Koila Gali,Bikaner",
          ticketPrice: "₹500",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "ABC",
          timeToTravel: "Afternoon",
          slot:"08:00 AM - 12:00 PM",
          placeAddress: "Lalgarh Fort C-113, Koila Gali,Bikaner",
          ticketPrice:"₹500",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "ABC",
          timeToTravel: "Evening",
          slot:"08:00 AM - 12:00 PM",
          placeAddress: "Lalgarh Fort C-113, Koila Gali,Bikaner",
          ticketPrice:"₹500",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
      ]
    },
    {
      day: "2",
      themeOfDay: "XYZ",
      activities: [
        {
          placeName: "RST",
          timeToTravel: "Morning",
          slot:"08:00 AM - 12:00 PM",
          placeAddress: "Karni Mata Mandir,Deshnok,Bikaner",
          ticketPrice:"Free",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: PQR",
          timeToTravel: "Afternoon",
          slot:"08:00 AM - 12:00 PM",
          placeAddress: "Karni Mata Mandir,Deshnok,Bikaner",
          ticketPrice:"Free",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "PQR",
          timeToTravel: "Evening",
          slot:"08:00 AM - 12:00 PM",
          placeAddress: "Karni Mata Mandir,Deshnok,Bikaner",
          ticketPrice:"Free",
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
          slot:"08:00 AM - 12:00 PM",
          placeAddress: "Karni Mata Mandir,Deshnok,Bikaner",
          ticketPrice:"Free",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "Deshnok Temple",
          timeToTravel: "Afternoon",
          slot:"08:00 AM - 12:00 PM",
          placeAddress: "Karni Mata Mandir,Deshnok,Bikaner",
          ticketPrice:"Free",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
        {
          placeName: "Deshnok Temple",
          timeToTravel: "Evening",
          slot:"08:00 AM - 12:00 PM",
          placeAddress: "Karni Mata Mandir,Deshnok,Bikaner",
          ticketPrice:"Free",
          placeDetails:"Built by Bikoji 500years after mirgration from Jodhpur"
        },
      ]
    },

  ],
}

Stick to this schema and create a full trip of {noOfDays} for {location}, budget : {budget} , travellers: {traveller}, Give me a Hotels options list with HotelName, Hotel address, Price (only range no other text), rating, descriptions and suggest itinerary with placeName, Place Details, ticket Pricing, timeSlot to visit in JSON format.Itinerary must be well scheduled while covering all the famous places in given duration of trip.
Stick to this schema only.`
