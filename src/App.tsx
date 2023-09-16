import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import HeroPage from "./pages/Home/HeroPage";
import DoctorProfile from "./pages/DoctorProfile_Dr/DoctorProfile";
import Appointments from "./pages/Appointments_Dr/Appointments";
import DoctorPost from "./pages/DoctorProfile_Dr/DoctorPost";

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
          <Route path="/post/:id" element={<DoctorPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
