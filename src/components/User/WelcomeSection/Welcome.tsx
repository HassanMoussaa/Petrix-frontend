import React from "react";
import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";

function Welcome() {
  return (
    <Box sx={{ flexGrow: 5 }}>
      <Grid container sx={{ mt: 15, justifyContent: "center" }}>
        <Grid
          xs={12}
          md={4}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            mt: 5,
            alignItems: "start",
          }}
        >
          <Grid sx={{ fontSize: 35, position: "relative" }}>
            <div
              className="claws-image"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100px",
                height: "auto",
                zIndex: 1,
              }}
            >
              <Box
                component="img"
                src={process.env.PUBLIC_URL + "/images/Claws.svg"}
                alt="logo"
                sx={{
                  width: "100px",
                  height: "auto",
                  ml: "-35px",
                  mt: "-35px",
                  opacity: "0.5",
                }}
              />
            </div>
            <b>
              Until one has loved an <br /> animal, a part of one's soul <br />
              remains unawakened
            </b>
          </Grid>
          <Grid sx={{ fontSize: 16 }}>
            Discover the magic of pet companionship! Click
            <br /> here to explore heartwarming stories and tips for
            <br /> caring for your furry friends.
          </Grid>
        </Grid>
        <Grid md={3} sx={{ display: { xs: "none", md: "flex" } }}>
          <div className="photo">
            <img
              src={process.env.PUBLIC_URL + "/images/HeropageMainphoto.svg"}
              alt="logo"
            ></img>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Welcome;
