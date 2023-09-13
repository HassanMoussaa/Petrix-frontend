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
      <Grid xs={12}>
        <Typography align="center" mt={5} mb={3} fontSize={32}>
          <b>What Can We Do</b>
        </Typography>
      </Grid>
      <Grid container justifyContent={"center"} gap={1}>
        <Grid xs={3}>
          <Typography
            align="center"
            fontSize={22}
            mt={5}
            mb={3}
            sx={{
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "center",
                color: "#FA6900",
              },
            }}
          >
            <b>PET OWNER</b>
          </Typography>
        </Grid>
        <Grid xs={3}>
          <Typography
            align="center"
            fontSize={22}
            mt={5}
            mb={3}
            sx={{
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "center",
                color: "#16A4C3",
              },
            }}
          >
            <b>DOCTORS</b>
          </Typography>
        </Grid>
      </Grid>
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
