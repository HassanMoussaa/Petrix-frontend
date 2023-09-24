import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import HeroPage from "./pages/Home/HeroPage";
import DoctorProfile from "./pages/DoctorProfile_Dr/DoctorProfile";
import Appointments from "./pages/Appointments_Dr/Appointments";
import DoctorPost from "./pages/DoctorProfile_Dr/DoctorPost";
import Ai_imageClassification_Main from "./pages/Ai_petOwner_ImgClass/Ai_imageClassification_Main";
import Ai_results from "./pages/Ai_petOwner_ImgClass/Ai_results";
import PetOwnerProfile from "./pages/PetOwner_Profile_petOwner/PetOwnerProfile";
import DoctorProfile_user from "./pages/DoctorProfile_User/DoctorProfile_user";
import BookAppointment from "./pages/DoctorProfile_User/BookAppointment";
import Notfication from "./components/notification";
import Petrix_doctors from "./pages/Ai_petOwner_ImgClass/Petrix_doctors";
import DoctorsNearYou from "./pages/GoogleMaps/DoctorsNearYou";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Notfication />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HeroPage />} />

          {/* doctor routes */}
          <Route
            path="/myProfile_doctor"
            element={
              <ProtectedRoute>
                <DoctorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <DoctorPost />
              </ProtectedRoute>
            }
          />
          {/* petOwner routes */}
          <Route
            path="/myProfile_petOwner"
            element={
              <ProtectedRoute>
                <PetOwnerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai_imageClassification"
            element={
              <ProtectedRoute>
                <Ai_imageClassification_Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai_imageClassification"
            element={
              <ProtectedRoute>
                <Ai_imageClassification_Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai_results"
            element={
              <ProtectedRoute>
                <Ai_results />
              </ProtectedRoute>
            }
          />
          {/* Route for doctor profile from petOwner */}
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <DoctorProfile_user />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book_appointment/:docId"
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/petrix-doctors"
            element={
              <ProtectedRoute>
                <Petrix_doctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors-near-you"
            element={
              <ProtectedRoute>
                <DoctorsNearYou />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
