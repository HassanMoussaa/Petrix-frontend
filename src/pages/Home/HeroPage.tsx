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

      <Grid>
        <Card
          imageUrl={"Customized_pages .svg"}
          title={"AI Image Classification"}
          body={"Upload photo of animal to check it's type"}
        />
      </Grid>
    </div>
  );
}

export default HeroPage;
