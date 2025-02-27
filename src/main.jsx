import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CreateTrip } from './pages/CreateTrip'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/custom/Header'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './pages/view-trip/[tripId]/viewTrip'
import MyTrips from './components/custom/MyTrips'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  },
  {
    path: '/view-trip/:tripId',
    element: <ViewTrip/>
  }, {
    path: '/my-trips',
    element:<MyTrips/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OUTH_CLIENT_ID}>
      <Header />
      <RouterProvider router={router}></RouterProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)
