import React from "react";
import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";

function welcome() {
  return (
    <Box sx={{ flexGrow: 5 }}>
      <Grid container sx={{ mt: 15 }}>
        <Grid xs={6}>
          <Grid sx={{ fontSize: 42 }}>
            Until one has loved an <br /> animal, a part of one's soul <br />
            remains unawakened
          </Grid>
          <Grid sx={{ fontSize: 23 }}>
            Discover the magic of pet companionship! Click
            <br /> here to explore heartwarming stories and tips for
            <br /> caring for your furry friends.
          </Grid>
        </Grid>
        <Grid xs={6}>
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
