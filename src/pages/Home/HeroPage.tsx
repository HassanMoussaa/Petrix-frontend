import React from "react";
import MainNavBar from "../../components/NavBar/MainNavBar";
import Welcome from "../../components/User/WelcomeSection/Welcome";
import Card from "../../components/User/WelcomeSection/Card";

import "./heropage.css";
import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";

function HeroPage() {
  return (
    <div className="heropage_body">
      <MainNavBar />
      <Welcome />

      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Card
          imageUrl={"ImageClassification.svg"}
          title={"AI Image Classification"}
          body={"Upload photo of animal to check it's type"}
        />
        <Card
          imageUrl={"ChatBot.svg"}
          title={"AI Chat Bot"}
          body={"Chat of Ai"}
        />
        <Card
          imageUrl={"Customized_pages .svg"}
          title={"Customized Pages"}
          body={"Customize your prifile"}
        />
        <Card
          imageUrl={"HandleBookings.svg"}
          title={"Handle Bookings"}
          body={"Manage your appointments"}
        />
      </Grid>
    </div>
  );
}

export default HeroPage;
