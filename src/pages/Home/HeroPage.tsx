import React from "react";
import MainNavBar from "../../components/NavBar/MainNavBar";
import Welcome from "../../components/User/WelcomeSection/Welcome";
import Card from "../../components/User/WelcomeSection/Card";

import "./heropage.css";
import { Grid, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HeroPage() {
  const navigate = useNavigate();

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
          body={"Upload photo of an animal to check its type"}
          onClick={() => navigate("/page1")}
        />
        <Card
          imageUrl={"ChatBot.svg"}
          title={"AI Chat Bot"}
          body={"Chat of AI"}
          onClick={() => navigate("/page2")}
        />
        <Card
          imageUrl={"Customized_pages .svg"}
          title={"Customized Pages"}
          body={"Customize your profile"}
          onClick={() => navigate("/page3")}
        />
        <Card
          imageUrl={"HandleBookings.svg"}
          title={"Handle Bookings"}
          body={"Manage your appointments"}
          onClick={() => navigate("/page4")}
        />
      </Grid>
    </div>
  );
}

export default HeroPage;
