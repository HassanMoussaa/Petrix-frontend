import React from "react";
import MainNavBar from "../../components/NavBar/MainNavBar";
import Welcome from "../../components/User/WelcomeSection/Welcome";
import Card from "../../components/User/WelcomeSection/Card";

import "./heropage.css";
import { Grid, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopDoctors from "../../components/User/WelcomeSection/TopDoctors";

const image_classification_card = {
  imageUrl: "ImageClassification.svg",
  title: "AI Image Classification",
  body: "Upload photo of an animal to check its type",
  navigate: "page1",
};
const chatbot_card = {
  imageUrl: "ChatBot.svg",
  title: "AI Chat Bot",
  body: "Chat of AI",
  navigate: "page2",
};
const doctors_near_you_card = {
  imageUrl: "ImageClassification.svg",
  title: "AI Image Classification",
  body: "Upload photo of an animal to check its type",
  navigate: "page1",
};
const customized_pages_card = {
  imageUrl: "Customized_pages .svg",
  title: "Customized Pages",
  body: "Customize your profile",
  navigate: "page3",
};
const handle_bookings_card = {
  imageUrl: "HandleBookings.svg",
  title: "Handle Bookings",
  body: "Manage your appointments",
  navigate: "page4",
};

interface HeroCard {
  imageUrl: string;
  title: string;
  body: string;
  navigate: string;
}

interface HeroCardMapping {
  user: HeroCard[];
  petOwner: HeroCard[];
  doctor: HeroCard[];
}

const hero_cards: HeroCardMapping = {
  user: [
    image_classification_card,
    chatbot_card,
    customized_pages_card,
    handle_bookings_card,
  ],
  petOwner: [image_classification_card, chatbot_card, doctors_near_you_card],
  doctor: [customized_pages_card, handle_bookings_card],
};

function HeroPage() {
  const navigate = useNavigate();

  const loginData = JSON.parse(localStorage.getItem("login") || "");
  const user_type =
    loginData?.user_type == 1
      ? "petOwner"
      : loginData?.user_type == 2
      ? "doctor"
      : "user";

  return (
    <div className="heropage_body">
      <MainNavBar
        imageUrl={loginData?.user_profile_picture}
        firstName={loginData?.firstName}
        lastName={loginData?.lastName}
      />
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
        {hero_cards[user_type].map((card) => (
          <Card
            imageUrl={card.imageUrl}
            title={card.title}
            body={card.body}
            onClick={() => navigate(`/${card.navigate}`)}
          />
        ))}
      </Grid>

      <TopDoctors />
    </div>
  );
}

export default HeroPage;
