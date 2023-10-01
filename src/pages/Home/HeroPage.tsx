import React from "react";
import MainNavBar from "../../components/NavBar/MainNavBar";
import Welcome from "../../components/User/WelcomeSection/Welcome";
import Card from "../../components/User/WelcomeSection/Card";

import "./heropage.css";
import {
  Grid,
  Box,
  Typography,
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TopDoctors from "../../components/User/WelcomeSection/TopDoctors";
import Footer from "../../components/Footer/Footer";

const image_classification_card = {
  imageUrl: "classification-54.svg",
  title: "AI Image Classification",
  body: "Upload photo of an animal to check its type",
  route: "/ai_imageClassification",
};
const chatbot_card = {
  imageUrl: "ChatBot.svg",
  title: "AI Chat Bot",
  body: "Chat of AI",
  route: "/chatbot",
};
const doctors_near_you_card = {
  imageUrl: "Map_near.svg",
  title: "Doctors Near You",
  body: "Click to check doctors near you!",
  route: "/doctors-near-you",
};
const customized_pages_card = {
  imageUrl: "Customized_pages .svg",
  title: "Customized Pages",
  body: "Customize your profile",
  route: "/myProfile_doctor",
};
const handle_bookings_card = {
  imageUrl: "HandleBookings.svg",
  title: "Handle Bookings",
  body: "Manage your appointments",
  route: "myProfile_doctor",
};

interface HeroCard {
  imageUrl: string;
  title: string;
  body: string;
  route: string;
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

  const loginData = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login") || "")
    : "";

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
        {user_type === "petOwner" && (
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
        )}
        {user_type === "doctor" && (
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
        )}
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 5,
        }}
      >
        {hero_cards[user_type].map((card) => {
          return (
            <Card
              imageUrl={card.imageUrl}
              title={card.title}
              body={card.body}
              onClick={() => {
                navigate(card.route);
              }}
            />
          );
        })}
      </Grid>

      <TopDoctors />

      <Footer userType={user_type} />
    </div>
  );
}

export default HeroPage;
