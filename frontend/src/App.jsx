import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import BackButton from './components/BackButton';

// Pages
import LandingPage from './pages/LandingPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import FlightBookingFlow from './pages/FlightBookingFlow';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SplashScreen from './pages/SplashScreen';

// New Pages
import BookingHubPage from './pages/BookingHubPage';
import FlightBookingPage from './pages/FlightBookingPage';
import HotelBookingPage from './pages/HotelBookingPage';
import ResortBookingPage from './pages/ResortBookingPage';
import CargoBookingPage from './pages/CargoBookingPage';
import GroupBookingPage from './pages/GroupBookingPage';
import ExperienceBookingPage from './pages/ExperienceBookingPage';
import ExperienceBookingFormPage from './pages/ExperienceBookingFormPage';
import OffersPage from './pages/OffersPage';
import HotelSearchResultsPage from './pages/HotelSearchResultsPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-surface text-dark selection:bg-primary/20">
          <Toaster
            position="top-center"
            toastOptions={{
              style: { background: '#ffffff', color: '#111827', border: '1px solid #F3F4F6', boxShadow: '0 8px 32px rgba(30,58,138,0.08)', borderRadius: '24px' },
            }}
          />
          <BackButton />
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/portal-selection" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Protected Routes */}
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/flights"
              element={
                <ProtectedRoute>
                  <FlightsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-flow"
              element={
                <ProtectedRoute>
                  <FlightBookingFlow />
                </ProtectedRoute>
              }
            />
            <Route
              path="/book"
              element={
                <ProtectedRoute>
                  <BookingHubPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/flight-booking"
              element={
                <ProtectedRoute>
                  <FlightBookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hotel-booking"
              element={
                <ProtectedRoute>
                  <HotelBookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hotel-results"
              element={
                <ProtectedRoute>
                  <HotelSearchResultsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/resort-booking"
              element={
                <ProtectedRoute>
                  <ResortBookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cargo-booking"
              element={
                <ProtectedRoute>
                  <CargoBookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/group-booking"
              element={
                <ProtectedRoute>
                  <GroupBookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/experience-booking"
              element={
                <ProtectedRoute>
                  <ExperienceBookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/experience-booking-form"
              element={
                <ProtectedRoute>
                  <ExperienceBookingFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <BookingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/offers"
              element={
                <ProtectedRoute>
                  <OffersPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
