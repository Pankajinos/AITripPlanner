import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMNI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY);

const tripSchema = {
  type: SchemaType.OBJECT,
  properties: {
    tripName: { type: SchemaType.STRING, description: "Title of the trip" },
    budget: { type: SchemaType.STRING, description: "Budget category" },
    travellers: { type: SchemaType.STRING, description: "Traveler type" },
    duration: { type: SchemaType.STRING, description: "Duration of the trip (e.g. 2 days)" },
    location: { type: SchemaType.STRING, description: "Destination location" },
    hotelOptions: {
      type: SchemaType.ARRAY,
      description: "List of recommended hotels",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          hotelName: { type: SchemaType.STRING },
          hotelAddress: { type: SchemaType.STRING },
          price: { type: SchemaType.STRING },
          rating: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
        },
        required: ["hotelName", "hotelAddress", "price", "rating", "description"],
      },
    },
    itinerary: {
      type: SchemaType.ARRAY,
      description: "Day by day itinerary",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          day: { type: SchemaType.STRING },
          themeOfDay: { type: SchemaType.STRING },
          activities: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                placeName: { type: SchemaType.STRING },
                timeToTravel: { type: SchemaType.STRING },
                slot: { type: SchemaType.STRING },
                placeAddress: { type: SchemaType.STRING },
                ticketPrice: { type: SchemaType.STRING },
                placeDetails: { type: SchemaType.STRING },
              },
              required: [
                "placeName",
                "timeToTravel",
                "slot",
                "placeAddress",
                "ticketPrice",
                "placeDetails",
              ],
            },
          },
        },
        required: ["day", "themeOfDay", "activities"],
      },
    },
  },
  required: [
    "tripName",
    "budget",
    "travellers",
    "duration",
    "location",
    "hotelOptions",
    "itinerary",
  ],
};

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: tripSchema,
};

export const model = genAI.getGenerativeModel({
  model: import.meta.env.VITE_GEMINI_MODEL || "gemini-3.5-flash-lite",
  systemInstruction:
    "You are an expert travel planner. You must return ONLY a single valid JSON object adhering strictly to the requested schema. Do not output any markdown code blocks, comments, or conversational text.",
  generationConfig,
});

// Stateless session wrapper so each generation is fresh and does not accumulate old history
export const chatSession = {
  sendMessage: async (prompt) => {
    return await model.generateContent(prompt);
  },
};
