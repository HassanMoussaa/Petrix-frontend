import React from "react";
import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";

function welcome() {
  return (
    <Box sx={{ flexGrow: 5 }}>
      <Grid container sx={{ mt: 15, justifyContent: "center" }}>
        <Grid
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            mt: 5,
          }}
        >
          <Grid sx={{ fontSize: 35 }}>
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
              src={process.env.PUBLIC_URL + "/images/Heropage_photo.png"}
              alt="logo"
            ></img>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default welcome;
