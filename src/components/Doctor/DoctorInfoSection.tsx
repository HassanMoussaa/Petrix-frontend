import React from "react";
import {
  Grid,
  Rating,
  Box,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  OutlinedInput,
  FormControl,
} from "@mui/material";

interface DoctorInfoSection {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

function DoctorInfoSection(props: DoctorInfoSection) {
  const { imageUrl, firstName, lastName } = props;
  const value = 2;

  return (
    <Grid container sx={{ display: { xs: "flex" }, ml: 10, mt: 10 }}>
      <Grid md={4} sx={{ display: { md: "flex" } }}>
        <div className="photo">
          <img
            src={process.env.PUBLIC_URL + "/images/Doctor profile pic.svg"}
            alt="logo"
          ></img>
        </div>
      </Grid>

      <Grid
        container
        md={4}
        sx={{
          display: { xs: "flex" },
          flexDirection: { xs: "column" },
          gap: 5,
        }}
      >
        <Grid
          container
          sx={{
            display: { xs: "flex" },
            flexDirection: { xs: "column" },
            gap: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: 28,
            }}
          >
            Dr {firstName} {lastName}
          </Typography>

          <Rating name="read-only" value={value} readOnly />
        </Grid>
        <Grid
          container
          sx={{
            display: { xs: "flex" },
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#16A4C3",
              borderRadius: 3,
              maxWidth: 100,
              height: 50,
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
            size="large"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#000",
              borderRadius: 3,
              maxWidth: 150,
              height: 50,
              "&:hover": {
                backgroundColor: "#16A4C3",
              },
            }}
            size="large"
          >
            Appointments
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DoctorInfoSection;
