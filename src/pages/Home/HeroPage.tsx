import React from "react";
import MainNavBar from "../../components/NavBar/MainNavBar";
import Welcome from "../../components/User/WelcomeSection/Welcome";
import "./heropage.css";

function HeroPage() {
  return (
    <div className="heropage_body">
      <MainNavBar />
      <Welcome />
    </div>
  );
}

export default HeroPage;
