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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HeroPage />} />

          {/* doctor routes */}
          <Route path="/profile" element={<DoctorProfile />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
