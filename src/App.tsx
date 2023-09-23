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
          <Route path="/myProfile_doctor" element={<DoctorProfile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/post" element={<DoctorPost />} />
          {/* petOwner routes */}
          <Route path="/myProfile_petOwner" element={<PetOwnerProfile />} />
          <Route
            path="/ai_imageClassification"
            element={<Ai_imageClassification_Main />}
          />
          <Route
            path="/ai_imageClassification"
            element={<Ai_imageClassification_Main />}
          />
          <Route path="/ai_results" element={<Ai_results />} />
          {/* Route for doctor profile from petOwner */}
          <Route path="/profile/:id" element={<DoctorProfile_user />} />
          <Route
            path="/book_appointment/:docId"
            element={<BookAppointment />}
          />
          <Route path="/petrix-doctors" element={<Petrix_doctors />} />
          <Route path="/doctors-near-you" element={<DoctorsNearYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
