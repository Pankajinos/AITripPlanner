# AI Trip Planner ✈️

An AI-powered travel planner built with React, Vite, Tailwind CSS, Google Gemini AI, and Firebase Firestore.

## Features

- 🧠 **AI-Powered Itineraries:** Generate comprehensive day-by-day travel plans with activities, timing, and local recommendations using Google Gemini.
- 🏨 **Hotel Recommendations:** Curated hotel options tailored to your destination and budget.
- 📍 **Google Places Autocomplete:** Interactive location search and place imagery.
- 🔐 **Google OAuth Login:** Seamless user authentication.
- 👥 **Companion Finder:** Discover and connect with other travelers heading to the same destination.
- 💾 **Firestore Storage:** Cloud persistence for all user trips.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-trip-planner.git
cd ai-trip-planner
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your respective API keys:

```env
# Google OAuth Client ID (from Google Cloud Console)
VITE_GOOGLE_OUTH_CLIENT_ID=your_google_oauth_client_id_here

# Google Gemini AI (from Google AI Studio)
VITE_GEMNI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash

# Google Maps / Places API Key (from Google Cloud Console)
VITE_GOOGLE_MAP_API=your_google_places_api_key_here

# Firebase Configuration (from Firebase Console -> Project Settings)
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```
