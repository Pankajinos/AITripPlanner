export const SelectTravelList = [
  { 
    id: 1,
    title: "Solo",
    desc: "A single traveller",
    icon: "👤", // Unicode character for Solo (Person icon)
    people: '1 person',
  },
  { 
    id: 2,
    title: "Couple",
    desc: "Two travelers",
    icon: "👫", // Unicode character for Couple (Couple emoji)
    people: '2 people',
  },
  { 
    id: 3,
    title: "Family",
    desc: "Group of fun loving people",
    icon: "🏠", // Unicode character for Family (Home icon)
    people: '3 to 5 people',
  },
  { 
    id: 4,  // Fixed the duplicate ID here
    title: "Friends",
    desc: "A bunch of thrill seekers",
    icon: "👯‍♀️", // Unicode character for Friends (People with bunny ears emoji)
    people: '6 to 10 people',
  },
];

export const Buget = [
  { 
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of cost",
    icon: "💰", // Unicode character for Cheap (Money bag icon)
  },
  { 
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💳", // Unicode character for Moderate (Credit card icon)
  },
  { 
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💎", // Unicode character for Luxury (Diamond icon)
  },
];

export const AI_PROMPT = `Generate Travel Plan for :{location}`;
