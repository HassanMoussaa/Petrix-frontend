import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import HeroPage from "./pages/Home/HeroPage";
import DoctorProfile from "./pages/DoctorProfile_Dr/DoctorProfile";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
