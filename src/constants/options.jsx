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

export const AI_PROMPT = `Generate a travel plan for {location} for {noOfDays} days for {traveller} with a {budget} budget.
Provide a list of hotel options with hotelName, hotelAddress, price, rating, and description.
Provide an itinerary with day, themeOfDay, and activities (including placeName, timeToTravel, slot, placeAddress, ticketPrice, and placeDetails).
Output MUST strictly follow the JSON schema.`
